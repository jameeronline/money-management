import { useAuth } from "../context/user-context";
import { Form, useActionData, useLoaderData } from "react-router-dom";

import { setValue, getValue } from "../utilities/localStore";

export const aboutAction = async ({ request }) => {
  const data = await request.formData();
  const userName = data.get("username");
  setValue("userName", userName);
  //return data.get("username");
  return { userName };
};

export const aboutLoader = () => {
  const userName = getValue("userName");
  return { userName };
};

const About = () => {
  const { currentUser } = useAuth();
  const { userName } = useLoaderData();

  if (currentUser) {
    console.log(currentUser);
  }

  return (
    <article className="prose lg:prose-xl">
      {userName && <h1>Welcome {userName}</h1>}

      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!confirm("Are you sure do delete your account?")) {
              event.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="inline-flex border border-red-500 text-red-500 px-4 rounded"
          >
            Remove User
          </button>
        </Form>
      )}

      <h1>Garlic bread with cheese: What the science tells us</h1>
      <p>
        For years parents have espoused the health benefits of eating garlic
        bread with cheese to their children, with the food earning such an
        iconic status in our culture that kids will often dress up as warm,
        cheesy loaf for Halloween.
      </p>
      <p>
        But a recent study shows that the celebrated appetizer may be linked to
        a series of rabies cases springing up around the country.
      </p>
    </article>
  );
};

export default About;
