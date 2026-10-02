#!/usr/bin/env python3
"""
Obrive High-Speed Parallel Dictionary Translator
=================================================
Uses multiprocessing + threading + translators library for maximum speed and to avoid rate limits.
"""

import json
import os
import sys
import time
import re
import random
import argparse
import threading
from pathlib import Path
from multiprocessing import Process, Queue
from queue import Queue as ThreadQueue, Empty

import os
os.environ["translators_default_region"] = "EN"
import translators as ts

# ──────────────────────────────────────────────────────────────────────────────
# PATHS & CONFIG
# ──────────────────────────────────────────────────────────────────────────────

SCRIPT_DIR = Path(__file__).parent
DICT_DIR = SCRIPT_DIR.parent / "src" / "dictionaries"
EN_PATH = DICT_DIR / "en.json"

LANGUAGE_MAP = {
    "ar": "ar",
    "es": "es",
    "pt": "pt",
    "fr": "fr",
    "de": "de",
    "nl": "nl",
    "sv": "sv",
    "it": "it",
    "zh": "zh-Hans", # Bing/translators uses zh-Hans or zh
    "ja": "ja",
    "ko": "ko",
    "ms": "ms",
    "id": "id",
    "th": "th",
}

# ──────────────────────────────────────────────────────────────────────────────
# BRAND TERM PROTECTION
# ──────────────────────────────────────────────────────────────────────────────

BRAND_MANGLING_MAP = {
    "ऑब्रिव": "Obrive", "ओब्राइव": "Obrive", "ऑब्राइव": "Obrive",
    "ओब्रिव": "Obrive", "अब्राइव": "Obrive", "ओब्रीव": "Obrive",
    "ओबपार्क": "Obpark", "ओबीपार्क": "Obpark",
    "ओबनेस्ट": "Obnest", "ओबीनेस्ट": "Obnest",
    "ओबनवी": "Obnavi", "ओबीनवी": "Obnavi",
    "ओबमूव": "Obmove", "ओबीमूव": "Obmove",
    "एआई": "AI", "ए आई": "AI",
    "एआर": "AR", "ए आर": "AR",
    "वीआर": "VR", "वी आर": "VR",
    "एमआर": "MR", "एम आर": "MR",
    "एसईओ": "SEO",
    "أوبرايف": "Obrive", "اوبرايف": "Obrive", "أوبريف": "Obrive",
    "أوبارك": "Obpark",
    "奥布赖夫": "Obrive",
    "A.I.": "AI", "A.R.": "AR", "V.R.": "VR", "M.R.": "MR",
}

def protect_brand_terms(text: str) -> str:
    for mangled, correct in BRAND_MANGLING_MAP.items():
        text = text.replace(mangled, correct)
    return text

# ──────────────────────────────────────────────────────────────────────────────
# SKIP LOGIC
# ──────────────────────────────────────────────────────────────────────────────

INTENTIONAL_ENGLISH_TERMS = [
    "Obrive", "OBRIVE", "Obpark", "OBPARK", "Obnest", "OBNEST", "Obnavi", "OBNAVI", "Obmove", "OBMOVE", "Obcrew", "OBCREW",
    "Razorpay", "Brevo", "Vercel", "GitHub", "LinkedIn", "WhatsApp",
    "AR", "VR", "MR", "XR", "AI", "3D", "API", "SaaS", "WebXR", "WebAR", "WebVR", "IoT", "SDK", "CRM", "ERP", "ML",
    "SEO", "AEO", "GEO", "SEO/AEO/GEO", "UI", "UX", "GST", "B2B", "B2C", "ROI", "KPI",
    "Digital Twin", "Digital Twins", "Spatial Computing", "Cloud",
    ".01", ".03", ".04", ".07"
]

SKIP_VALUE_RE = [
    re.compile(r"^\s*$"),
    re.compile(r"^\d+$"),
    re.compile(r"^https?://\S+$"),
]

def should_skip(value: str) -> bool:
    v = value.strip()
    if len(v) <= 1:
        return True
    if v in INTENTIONAL_ENGLISH_TERMS:
        return True
    for pat in SKIP_VALUE_RE:
        if pat.match(v):
            return True
    return False

def is_unchanged(en_val: str, lang_val: str) -> bool:
    return en_val.strip() == lang_val.strip()

# ──────────────────────────────────────────────────────────────────────────────
# SINGLE-KEY TRANSLATION
# ──────────────────────────────────────────────────────────────────────────────

def translate_one(text: str, gt_lang: str) -> str:
    """Translates using translators library with retries."""
    MAX_RETRIES = 5
    engines = ['bing', 'alibaba', 'caiyun']
    if gt_lang == 'zh-Hans':
        engines = ['bing', 'alibaba'] # some engines don't support zh-Hans as expected
    
    for attempt in range(MAX_RETRIES):
        engine = engines[attempt % len(engines)]
        try:
            out = ts.translate_text(text, to_language=gt_lang, translator=engine)
            if out and len(out) > 0 and out.strip() != text.strip():
                out = protect_brand_terms(out)
                return out
        except Exception as e:
            if attempt < MAX_RETRIES - 1:
                time.sleep(random.uniform(0.5, 2.0))
            else:
                return text  # English fallback
    return text

# ──────────────────────────────────────────────────────────────────────────────
# THREAD WORKER
# ──────────────────────────────────────────────────────────────────────────────

def thread_worker(
    work_queue: ThreadQueue,
    result_dict: dict,
    result_lock: threading.Lock,
    gt_lang: str,
    log_fn,
):
    """Each thread pops keys from work_queue, translates, writes to result_dict."""
    time.sleep(random.uniform(0.1, 0.5))

    while True:
        try:
            key, en_val = work_queue.get(timeout=2)
        except Empty:
            break

        try:
            translated = translate_one(en_val, gt_lang)
            with result_lock:
                result_dict[key] = translated
        except Exception as e:
            log_fn(f"Thread error on '{key[:40]}': {e}")
            with result_lock:
                result_dict[key] = en_val  # English fallback

        work_queue.task_done()
        time.sleep(random.uniform(0.1, 0.3))

# ──────────────────────────────────────────────────────────────────────────────
# PER-LANGUAGE WORKER PROCESS
# ──────────────────────────────────────────────────────────────────────────────

def worker_translate_language(
    lang_code: str,
    en_dict: dict,
    force: bool,
    num_threads: int,
    log_queue: Queue,
):
    """Process: translates all missing keys for one language using thread pool."""

    def log(msg):
        log_queue.put(f"[{lang_code}] {msg}")

    gt_lang = LANGUAGE_MAP[lang_code]
    lang_path = DICT_DIR / f"{lang_code}.json"

    # Load existing dict
    if lang_path.exists():
        try:
            with open(lang_path, "r", encoding="utf-8") as f:
                lang_dict = json.load(f)
        except Exception:
            lang_dict = {}
    else:
        lang_dict = {}

    # Build work queue
    to_translate = []
    for key, en_val in en_dict.items():
        if should_skip(en_val):
            if key not in lang_dict:
                lang_dict[key] = en_val
            continue
        if key not in lang_dict:
            to_translate.append((key, en_val))
        elif force and is_unchanged(en_val, lang_dict[key]):
            to_translate.append((key, en_val))

    total = len(to_translate)
    log(f"Keys to translate: {total} / {len(en_dict)}")

    if total == 0:
        log("Already complete.")
        # Final save to ensure all skip keys are written
        with open(lang_path, "w", encoding="utf-8") as f:
            json.dump(lang_dict, f, ensure_ascii=False, indent=2)
        return

    # Fill thread work queue
    work_queue = ThreadQueue()
    for item in to_translate:
        work_queue.put(item)

    result_dict = {}
    result_lock = threading.Lock()

    # Launch threads
    threads = []
    actual_threads = min(num_threads, total, 10)  # cap at 10 threads per language
    for _ in range(actual_threads):
        t = threading.Thread(
            target=thread_worker,
            args=(work_queue, result_dict, result_lock, gt_lang, log),
            daemon=True,
        )
        t.start()
        threads.append(t)
        time.sleep(0.2)  # stagger thread starts

    log(f"Started {actual_threads} translation threads")

    # Monitor progress and save periodically
    last_saved = 0
    last_reported = 0
    SAVE_EVERY = 50
    REPORT_EVERY = 50

    while True:
        done = len(result_dict)

        # Periodic progress report
        if done - last_reported >= REPORT_EVERY:
            pct = done * 100 // total if total else 100
            log(f"Progress: {done}/{total} ({pct}%)")
            last_reported = done

        # Periodic save
        if done - last_saved >= SAVE_EVERY:
            with result_lock:
                snapshot = dict(result_dict)
            merged = {**lang_dict, **snapshot}
            try:
                with open(lang_path, "w", encoding="utf-8") as f:
                    json.dump(merged, f, ensure_ascii=False, indent=2)
                last_saved = done
            except Exception as e:
                log(f"Save error: {e}")

        # Check if all work done
        if done >= total:
            break

        # Check if all threads finished
        alive = sum(1 for t in threads if t.is_alive())
        if alive == 0:
            break

        time.sleep(2)

    # Wait for threads to finish
    for t in threads:
        t.join(timeout=30)

    # Final save
    with result_lock:
        snapshot = dict(result_dict)
    merged = {**lang_dict, **snapshot}
    try:
        with open(lang_path, "w", encoding="utf-8") as f:
            json.dump(merged, f, ensure_ascii=False, indent=2)
        done = len(snapshot)
        log(f"DONE — {done} keys translated. Total keys: {len(merged)}")
    except Exception as e:
        log(f"Final save error: {e}")

# ──────────────────────────────────────────────────────────────────────────────
# LOG LISTENER
# ──────────────────────────────────────────────────────────────────────────────

def log_listener(log_queue: Queue, log_path: Path):
    import threading as _t
    with open(log_path, "w", encoding="utf-8") as log_file:
        while True:
            try:
                msg = log_queue.get(timeout=360)
                if msg is None:
                    break
                line = f"{time.strftime('%H:%M:%S')}  {msg}"
                print(line, flush=True)
                log_file.write(line + "\n")
                log_file.flush()
            except Exception:
                break

# ──────────────────────────────────────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Obrive High-Speed Parallel Translator")
    parser.add_argument("--lang", nargs="*", default=list(LANGUAGE_MAP.keys()))
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--workers", type=int, default=14, help="Language processes in parallel")
    parser.add_argument("--threads", type=int, default=8, help="Threads per language")
    args = parser.parse_args()

    if not EN_PATH.exists():
        print(f"ERROR: {EN_PATH} not found"); sys.exit(1)

    with open(EN_PATH, "r", encoding="utf-8") as f:
        en_dict = json.load(f)

    langs = [l for l in args.lang if l in LANGUAGE_MAP]
    print(f"English keys:  {len(en_dict)}")
    print(f"Languages:     {langs}")
    print(f"Lang workers:  {args.workers}")
    print(f"Threads/lang:  {args.threads}")
    print(f"Force:         {args.force}")
    print()

    log_queue = Queue(maxsize=10000)
    log_path = SCRIPT_DIR / "translation_run.log"

    import threading
    log_thread = threading.Thread(
        target=log_listener, args=(log_queue, log_path), daemon=True
    )
    log_thread.start()

    # Launch language processes in batches
    pending = [(l, Process(
        target=worker_translate_language,
        args=(l, en_dict, args.force, args.threads, log_queue),
        name=f"lang-{l}",
        daemon=False,
    )) for l in langs]

    active = []

    while pending or active:
        while pending and len(active) < args.workers:
            lang_code, p = pending.pop(0)
            p.start()
            print(f"▶ Started: {lang_code} (PID {p.pid})", flush=True)
            active.append((lang_code, p))

        still_active = []
        for lang_code, p in active:
            if p.is_alive():
                still_active.append((lang_code, p))
            else:
                p.join()
                ok = "✓" if p.exitcode == 0 else f"✗ exit={p.exitcode}"
                print(f"■ Done: {lang_code} [{ok}]", flush=True)
        active = still_active

        if pending or active:
            time.sleep(3)

    log_queue.put(None)
    log_thread.join(timeout=10)
    print(f"\n✓ All done. Log: {log_path}", flush=True)

if __name__ == "__main__":
    main()
