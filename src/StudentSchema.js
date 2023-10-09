import * as Yup from 'yup'
export const validationSchema  = Yup.object({
  studentName: Yup.string().required('Student Name is required'),
  date: Yup.date().required('Date of Birth is required')
  .max(new Date(), 'Date of Birth cannot be in the future')
  .test(
    'is-age-greater-than-3',
    'Student must be greater than 3 years old',
    function (value) {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 3;
    }
  ),
  gender: Yup.string().required('Gender is required'),
  fatherName: Yup.string().required('Father Name is required'),
  motherName: Yup.string().required('Mother Name is required'),
  email:Yup.string().email('Invalid email format').required("Email is must"),
  phone: Yup.string().matches(/^\d{10}$/, 'Phone Number must be 10 digits').required('Phone Number is required'),
  address: Yup.string().required('Address is required'),
})
  