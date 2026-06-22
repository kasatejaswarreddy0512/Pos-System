import GenericCrudPage from "../crud/GenericCrudPage.jsx";
import { tableColumns } from "../crud/entityConfigs.jsx";
import { orderService } from "../../services/orderService.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useAppState } from "../../hooks/useAppState.js";
import { BRANCH_ROLES } from "../../constants/roles.js";

export default function OrdersPage() {
    const { user, role } = useAuth();

    const { selectedBranchId, selectedStoreId } = useAppState();

    const branchId =
        selectedBranchId ||
        user?.branch?.id ||
        user?.branchId;

    const storeId =
        selectedStoreId ||
        user?.store?.id ||
        user?.storeId;

    const branchScope = BRANCH_ROLES.includes(role);

    const loadOrders = () => {
        if (branchScope && branchId) {
            return orderService.getByBranch(branchId);
        }

        if (storeId) {
            return orderService.getByStore(storeId);
        }

        return orderService.getMyStoreOrders();
    };

    return (
        <GenericCrudPage
            title="Order"
            subtitle="Order history, payment modes and status"
            columns={tableColumns.orders}
            fields={[]}
            initialValues={{}}
            loadData={loadOrders}
            createData={orderService.create}
            updateData={null}
            deleteData={orderService.remove}
            disableCreate
        />
    );
}