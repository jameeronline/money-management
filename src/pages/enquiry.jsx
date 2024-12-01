import { Form, useActionData } from "react-router-dom";

export async function enquireFormAction({ request }) {
  const formData = await request.formData();
  console.log(formData.get("id"));
  console.log(formData.get("dob"));
  return formData;
}

const Enquiry = () => {
  const actionData = useActionData();

  return (
    <div>
      Enquiry
      <Form method="post">
        <label>ID Number</label>
        <input type="text" name="id" placeholder="id number" />
        <label>Date of Birth</label>
        <input type="text" name="dob" placeholder="dd/mm/yyyy" />
        <button type="submit" className="inline-flex px-8 py-4 bg-red-400">
          Enquire
        </button>
      </Form>
    </div>
  );
};

export default Enquiry;
