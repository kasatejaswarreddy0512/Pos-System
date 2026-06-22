import GenericCrudPage from "../crud/GenericCrudPage.jsx";

import {
    storeFields,
    schemas,
    tableColumns,
} from "../crud/entityConfigs.jsx";

import { storeService } from "../../services/storeService.js";

const initialValues = {
    brand: "",
    storeType: "",
    description: "",
    contact: {
        email: "",
        phone: "",
        address: "",
    },
};

export default function StoresPage() {
    return (
        <GenericCrudPage
            title="Store"
            subtitle="Manage store profiles and moderation status"
            columns={tableColumns.stores}
            fields={storeFields}
            initialValues={initialValues}
            validationSchema={schemas.store}
            loadData={storeService.getAll}
            createData={storeService.create}
            updateData={storeService.update}
            deleteData={storeService.remove}
        />
    );
}