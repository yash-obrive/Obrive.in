export default function TestComponent({ items }: any) {
  console.log("TestComponent items:", JSON.stringify(items, null, 2));
  return <div>Test</div>;
}
