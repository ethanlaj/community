// import Joi from "joi";
// import useForm from "@/shared/components/Form";

const locationObj = { name: '', address: '' };

function CreateLocation({
  form, data, errors, onChange: setData,
}) {
  // if (!data || !setData) {
  // [data, setData] = useState({
  // locations: [locationObj],
  // });
  // }
  // const [errors, setErrors] = useState({});

  // const schema = {
  // locations: Joi.array().items({
  //  name: Joi.string().required().label("Name"),
  //  address: Joi.string().required().label("Address"),
  // }),
  // };

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Address', field: 'address' },
  ];

  const handleAddLocation = () => {
    setData([...data, locationObj]);
  };

  const handleUpdateLocations = (locations) => {
    setData([...locations]);
  };

  // const form = useForm(data, setData, errors, setErrors, schema, doSubmit);
  return (
    <div>
      {form.renderEditableTable(
        columns,
        data,
        errors.locations,
        handleUpdateLocations,
        handleAddLocation,
      )}
    </div>
  );
}

export default CreateLocation;
