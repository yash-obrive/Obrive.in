import os

replacements = {
    'src/app/(public)/checkout/components/CheckoutForm.tsx': [
        ('First Name *', '<Translate text="First Name *" />'),
        ('Last Name *', '<Translate text="Last Name *" />'),
        ('Email Address *', '<Translate text="Email Address *" />'),
        ('Phone Number *', '<Translate text="Phone Number *" />'),
        ('Billing Address *', '<Translate text="Billing Address *" />'),
        ('GST on Service @ 18%', '<Translate text="GST on Service @ 18%" />'),
        ('Payment Gateway Fee @ 2%', '<Translate text="Payment Gateway Fee @ 2%" />'),
        ('GST on Gateway Fee @ 18%', '<Translate text="GST on Gateway Fee @ 18%" />'),
        ('Thank you! Your payment has been confirmed and your service scope\n            has been initiated.', '<Translate text="Thank you! Your payment has been confirmed and your service scope has been initiated." />'),
        ('← Back to Pricing', '<Translate text="← Back to Pricing" />')
    ],
    'src/app/(public)/checkout/components/CheckoutHero.tsx': [
        ('Complete your details to initiate the project scope and begin the\n          development process.', '<Translate text="Complete your details to initiate the project scope and begin the development process." />')
    ],
    'src/app/(public)/contact/components/ContactForm.tsx': [
        ('Your enquiry form is ready, but submissions are not currently\n                connected to an email or CRM backend.', '<Translate text="Your enquiry form is ready, but submissions are not currently connected to an email or CRM backend." />'),
        ('No lead was saved and no email was sent. Please configure your\n                notification service.', '<Translate text="No lead was saved and no email was sent. Please configure your notification service." />'),
        ('>Full Name *<', '><Translate text="Full Name *" /><'),
        ('>Email Address *<', '><Translate text="Email Address *" /><'),
        ('>Service of Interest *<', '><Translate text="Service of Interest *" /><'),
        ('>Message *<', '><Translate text="Message *" /><'),
        ('By submitting this form, you agree to our Privacy Policy and Terms of\n          Service.', '<Translate text="By submitting this form, you agree to our Privacy Policy and Terms of Service." />'),
        ('Thank you for reaching out. Our team has received your enquiry\n                and will get back to you shortly.', '<Translate text="Thank you for reaching out. Our team has received your enquiry and will get back to you shortly." />'),
        ('Whether you need immersive experiences, custom software, or a\n              full-funnel growth strategy, our team is ready to help you build\n              what\'s next.', '<Translate text="Whether you need immersive experiences, custom software, or a full-funnel growth strategy, our team is ready to help you build what\'s next." />')
    ],
    'src/app/(public)/servicecharges/page.tsx': [
        ('Payments made to Obrive are processed securely using trusted payment\n          gateways. Project scopes, service packages, subscriptions, and other\n          digital services must be paid according to the agreed milestones\n          before project initiation or confirmation. Prices may vary depending\n          on the specific project requirements, engagement duration, and\n          applicable taxes. All payments are subject to successful authorization\n          and confirmation.', '<Translate text="Payments made to Obrive are processed securely using trusted payment gateways. Project scopes, service packages, subscriptions, and other digital services must be paid according to the agreed milestones before project initiation or confirmation. Prices may vary depending on the specific project requirements, engagement duration, and applicable taxes. All payments are subject to successful authorization and confirmation." />')
    ],
    'src/app/(public)/servicecharges/components/PricingSection.tsx': [
        ('Each package is a starting commercial scope. Final deliverables,\n                timeline and payment amount are confirmed in the SOW before\n                checkout.', '<Translate text="Each package is a starting commercial scope. Final deliverables, timeline and payment amount are confirmed in the SOW before checkout." />')
    ],
    'src/app/(public)/servicecharges/components/PricingHero.tsx': [
        ('Transparent starting prices for immersive experiences, digital\n            products, software engineering and growth. Choose a stream, select a\n            package and move into a clearly scoped engagement.', '<Translate text="Transparent starting prices for immersive experiences, digital products, software engineering and growth. Choose a stream, select a package and move into a clearly scoped engagement." />'),
        ('>Premium fixed packages for defined scopes. Enterprise,\n                multi-platform and high-complexity projects move to a custom\n                SOW.<', '><Translate text="Premium fixed packages for defined scopes. Enterprise, multi-platform and high-complexity projects move to a custom SOW." /><'),
        ('₹1L — ₹7L+', '<Translate text="₹1L — ₹7L+" />')
    ],
    'src/app/(public)/servicecharges/components/PricingHowItWorks.tsx': [
        ('Prototype pricing is a proposed standard package list. Final pricing\n          depends on scope, integrations, number of screens/assets, platforms,\n          third-party licences, hosting/cloud costs and delivery requirements.\n          GST and advertising spend are extra unless included in the signed\n          proposal. USD figures are indicative at approximately ₹87/USD and\n          should be recalculated at invoice time.', '<Translate text="Prototype pricing is a proposed standard package list. Final pricing depends on scope, integrations, number of screens/assets, platforms, third-party licences, hosting/cloud costs and delivery requirements. GST and advertising spend are extra unless included in the signed proposal. USD figures are indicative at approximately ₹87/USD and should be recalculated at invoice time." />')
    ],
    'src/app/(public)/partners/ClientPartnersPage.tsx': [
        ('*FINAL PARTNER PRICING IS SCOPED ACCORDING TO TECHNOLOGY, PROJECT COMPLEXITY, TEAM REQUIREMENTS AND ENGAGEMENT MODEL.', '<Translate text="*FINAL PARTNER PRICING IS SCOPED ACCORDING TO TECHNOLOGY, PROJECT COMPLEXITY, TEAM REQUIREMENTS AND ENGAGEMENT MODEL." />')
    ],
    'src/app/(public)/coming-soon/page.tsx': [
        ('Our AI assistant is currently in development and will be available\n          soon. Stay tuned for exciting updates!', '<Translate text="Our AI assistant is currently in development and will be available soon. Stay tuned for exciting updates!" />')
    ],
    'src/app/(public)/community-forum/page.tsx': [
        ('We\'re creating a vibrant community platform to connect users, share\n          ideas, and collaborate on projects. Stay tuned for updates and early\n          access opportunities!', '<Translate text="We\'re creating a vibrant community platform to connect users, share ideas, and collaborate on projects. Stay tuned for updates and early access opportunities!" />')
    ],
    'src/app/(public)/global/page.tsx': [
        ('If you\'re passionate about immersive technology you\'re in the\n                  right place.', '<Translate text="If you\'re passionate about immersive technology you\'re in the right place." />'),
        ('Find the right solution, product, industry application, technology\n            resource or support page. Obrive connects AR, VR, MR, 3D Design and\n            Spatial Computing to real-world business experiences.', '<Translate text="Find the right solution, product, industry application, technology resource or support page. Obrive connects AR, VR, MR, 3D Design and Spatial Computing to real-world business experiences." />')
    ]
}

def ensure_import(content, filepath):
    if 'import Translate' not in content:
        # Find the last import
        import_idx = content.rfind('import ')
        if import_idx != -1:
            end_of_line = content.find('\n', import_idx)
            content = content[:end_of_line] + '\nimport Translate from "@/components/shared/Translate";' + content[end_of_line:]
        else:
            content = 'import Translate from "@/components/shared/Translate";\n' + content
    return content

for filepath, reps in replacements.items():
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        for old, new in reps:
            content = content.replace(old, new)
            
        content = ensure_import(content, filepath)
            
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"File not found: {filepath}")

