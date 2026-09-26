import Translate from "@/components/shared/Translate";

export default function TestComponent({ items }: any) {
  console.log("TestComponent items:", JSON.stringify(items, null, 2));
  return <div> <Translate text="Test" /> </div>;
}
