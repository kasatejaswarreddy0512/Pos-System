import * as Yup from "yup";
export const storeSchema = Yup.object({
  brand: Yup.string().required("Store name is required"),
  storeType: Yup.string().required("Store type is required"),
  description: Yup.string().nullable(),
  contact: Yup.object({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
  }),
});
export const branchSchema = Yup.object({
  name: Yup.string().required("Branch name is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Enter valid email").required("Email is required"),
  openTime: Yup.string().required("Open time is required"),
  closeTime: Yup.string().required("Close time is required"),
  workingDays: Yup.array().min(1, "Select at least one day"),
});
export const categorySchema = Yup.object({
  name: Yup.string().required("Category name is required"),
});
export const productSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  sku: Yup.string().required("SKU is required"),
  mrp: Yup.number().min(0).required("MRP is required"),
  sellingPrice: Yup.number().min(0).required("Selling price is required"),
});
export const customerSchema = Yup.object({
  fullName: Yup.string().required("Customer name is required"),
  email: Yup.string().email("Enter valid email").nullable(),
  phone: Yup.string().required("Phone is required"),
});
export const employeeSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Enter valid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters"),
  role: Yup.string().required("Role is required"),
});
export const inventorySchema = Yup.object({
  branchId: Yup.mixed().required("Branch is required"),
  productId: Yup.mixed().required("Product is required"),
  quantity: Yup.number().min(0).required("Quantity is required"),
});
export const refundSchema = Yup.object({
  orderId: Yup.mixed().required("Order is required"),
  reason: Yup.string().required("Reason is required"),
  amount: Yup.number().min(1).required("Amount is required"),
  paymentType: Yup.string().required("Payment type is required"),
});
