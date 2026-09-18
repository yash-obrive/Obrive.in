import re

with open("src/content/legal/gst-taxes-policy.mdx", "r") as f:
    content = f.read()
    
old_faqs = """<FAQAccordion faqs={[
    {
      q: "Is GST included in Obrive’s quoted price?",
      a: "Unless the quotation or Contract expressly says the price is GST-inclusive, applicable GST and statutory taxes are generally additional to the professional fee."
    },
    {
      q: "Will GST apply to every Obrive service?",
      a: "The applicable tax treatment depends on the nature of the supply, customer location/status, place-of-supply rules, exemptions and other legal requirements. The applicable invoice will identify the tax charged."
    },
    {
      q: "Can I provide my GSTIN after receiving the invoice?",
      a: "Customers should provide accurate GSTIN and billing information before invoicing where possible. If an invoice needs correction, Obrive will review the request and make changes only where legally and procedurally appropriate."
    },
    {
      q: "Does having a GSTIN automatically make a transaction inter-State?",
      a: "No. GSTIN information is important, but the applicable tax treatment also depends on supplier location, recipient location and place-of-supply rules."
    },
    {
      q: "Do international customers automatically get GST-free invoices?",
      a: "No. A foreign customer does not automatically make a supply an export of services. The statutory conditions for export treatment must be satisfied."
    },
    {
      q: "Can an international customer be charged GST?",
      a: "Potentially, depending on the facts and applicable GST/place-of-supply rules. Obrive will determine the transaction treatment based on the information available and applicable law."
    },
    {
      q: "Does UPI or bank transfer include GST?",
      a: "The payment method does not determine whether GST applies. Applicable GST is based on the underlying supply and tax rules."
    },
    {
      q: "What happens if my bank or card provider charges a fee?",
      a: "Payment-provider charges may be separate from Obrive’s service fee and GST. Where the provider deducts charges from the amount received, the customer may need to ensure the invoiced amount is fully settled."
    },
    {
      q: "Does TDS reduce the invoice amount?",
      a: "Where TDS is legally applicable, the customer may deduct the required amount and must provide the appropriate statutory documentation. TDS treatment should follow applicable income-tax law and the Contract."
    },
    {
      q: "Can I claim input tax credit on Obrive’s invoice?",
      a: "Possibly, if you meet the legal requirements. Obrive cannot guarantee a customer’s eligibility for ITC; that determination belongs to the customer and its tax advisers."
    },
    {
      q: "What if I make a mistake in my GSTIN?",
      a: "Notify Obrive promptly. Obrive will assess whether an invoice correction or other document is legally and procedurally appropriate."
    },
    {
      q: "What if GST rules change during my contract?",
      a: "If a legal change affects the applicable tax, Obrive may adjust future invoices or tax treatment from the effective date of the change."
    },
    {
      q: "Are refunds of GST handled separately?",
      a: "Any refund or credit is handled under the Refund Policy and applicable GST rules. Where a tax adjustment is legally required, Obrive may issue the appropriate credit note or documentation."
    },
    {
      q: "Who is responsible for the customer’s tax compliance?",
      a: "The customer is responsible for its own GST, TDS, withholding, ITC, accounting, reporting and other tax obligations. Obrive provides transaction documentation as required by law."
    }
  ]} />"""
  
new_faqs = """<FAQAccordion>
    <FAQItem q="Is GST included in Obrive’s quoted price?">
      Unless the quotation or Contract expressly says the price is GST-inclusive, applicable GST and statutory taxes are generally additional to the professional fee.
    </FAQItem>
    <FAQItem q="Will GST apply to every Obrive service?">
      The applicable tax treatment depends on the nature of the supply, customer location/status, place-of-supply rules, exemptions and other legal requirements. The applicable invoice will identify the tax charged.
    </FAQItem>
    <FAQItem q="Can I provide my GSTIN after receiving the invoice?">
      Customers should provide accurate GSTIN and billing information before invoicing where possible. If an invoice needs correction, Obrive will review the request and make changes only where legally and procedurally appropriate.
    </FAQItem>
    <FAQItem q="Does having a GSTIN automatically make a transaction inter-State?">
      No. GSTIN information is important, but the applicable tax treatment also depends on supplier location, recipient location and place-of-supply rules.
    </FAQItem>
    <FAQItem q="Do international customers automatically get GST-free invoices?">
      No. A foreign customer does not automatically make a supply an export of services. The statutory conditions for export treatment must be satisfied.
    </FAQItem>
    <FAQItem q="Can an international customer be charged GST?">
      Potentially, depending on the facts and applicable GST/place-of-supply rules. Obrive will determine the transaction treatment based on the information available and applicable law.
    </FAQItem>
    <FAQItem q="Does UPI or bank transfer include GST?">
      The payment method does not determine whether GST applies. Applicable GST is based on the underlying supply and tax rules.
    </FAQItem>
    <FAQItem q="What happens if my bank or card provider charges a fee?">
      Payment-provider charges may be separate from Obrive’s service fee and GST. Where the provider deducts charges from the amount received, the customer may need to ensure the invoiced amount is fully settled.
    </FAQItem>
    <FAQItem q="Does TDS reduce the invoice amount?">
      Where TDS is legally applicable, the customer may deduct the required amount and must provide the appropriate statutory documentation. TDS treatment should follow applicable income-tax law and the Contract.
    </FAQItem>
    <FAQItem q="Can I claim input tax credit on Obrive’s invoice?">
      Possibly, if you meet the legal requirements. Obrive cannot guarantee a customer’s eligibility for ITC; that determination belongs to the customer and its tax advisers.
    </FAQItem>
    <FAQItem q="What if I make a mistake in my GSTIN?">
      Notify Obrive promptly. Obrive will assess whether an invoice correction or other document is legally and procedurally appropriate.
    </FAQItem>
    <FAQItem q="What if GST rules change during my contract?">
      If a legal change affects the applicable tax, Obrive may adjust future invoices or tax treatment from the effective date of the change.
    </FAQItem>
    <FAQItem q="Are refunds of GST handled separately?">
      Any refund or credit is handled under the Refund Policy and applicable GST rules. Where a tax adjustment is legally required, Obrive may issue the appropriate credit note or documentation.
    </FAQItem>
    <FAQItem q="Who is responsible for the customer’s tax compliance?">
      The customer is responsible for its own GST, TDS, withholding, ITC, accounting, reporting and other tax obligations. Obrive provides transaction documentation as required by law.
    </FAQItem>
  </FAQAccordion>"""
  
if old_faqs in content:
    content = content.replace(old_faqs, new_faqs)
    with open("src/content/legal/gst-taxes-policy.mdx", "w") as f:
        f.write(content)
    print("Replaced!")
else:
    print("Could not find old faqs string, maybe it has different whitespace")
    import re
    # Just replace the whole section
    content = re.sub(r'<FAQAccordion faqs=\{.*?} />', new_faqs, content, flags=re.DOTALL)
    with open("src/content/legal/gst-taxes-policy.mdx", "w") as f:
        f.write(content)
    print("Replaced via regex!")
