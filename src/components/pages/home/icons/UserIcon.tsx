import Image from "next/image";
import { ICONS, ICONS_META } from "@/assets/images";

export default function UserIcon() {
  return (
    <Image
      src={ICONS.USER_ICON_HOME}
      width={ICONS_META.USER_ICON_HOME.width}
      height={ICONS_META.USER_ICON_HOME.height}
      alt={ICONS_META.USER_ICON_HOME.alt}
    />
  );
}
