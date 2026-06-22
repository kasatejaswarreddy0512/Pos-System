import GenericCrudPage from "../crud/GenericCrudPage.jsx";

import {
    customerFields,
    schemas,
    tableColumns,
} from "../crud/entityConfigs.jsx";

import { customerService } from "../../services/customerService.js";

export default function CustomersPage() {
    return (
        <GenericCrudPage
            title="Customer"
            subtitle="Customer directory and contact details"
            columns={tableColumns.customers}
            fields={customerFields}
            initialValues={{
                fullName: "",
                email: "",
                phone: "",
            }}
            validationSchema={schemas.customer}
            loadData={customerService.getAll}
            createData={customerService.create}
            updateData={customerService.update}
            deleteData={customerService.remove}
        />
    );
}