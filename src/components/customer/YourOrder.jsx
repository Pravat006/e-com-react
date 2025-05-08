import Input from "../root/Input";

export default function YourOrder() {
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  return (
    <div className="min-h-screen  flex justify-center py-10">
      <div className="w-full max-w-4xl bg-[var(--section-bg)] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>

        <div className="w-full  grid grid-cols-1 gap-4">
          <Input
            label="Address Line-1 :"
            placeholder="@eg. New lane central, D-203"
            className="border p-2 rounded w-full mt-0"
          />
          <Input
            label="Address Line-2"
            placeholder="@eg. New lane central, D-203"
            className="border p-2 rounded w-full mt-0"
          />

          <select className="border p-2 rounded w-full mt-0">
            <option value="" disabled selected>
              Select state
            </option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              label="City"
              placeholder="@Puri"
              className="border p-2 rounded w-full"
            />
            <Input
              label="Zip code"
              type="number"
              placeholder="@750566"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
