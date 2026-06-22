import GenericCrudPage from "../crud/GenericCrudPage.jsx";
import { tableColumns } from "../crud/entityConfigs.jsx";
import { shiftReportService } from "../../services/shiftReportService.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useAppState } from "../../hooks/useAppState.js";

export default function ShiftReportsPage() {
    const { user } = useAuth();
    const { selectedBranchId } = useAppState();

    const branchId =
        selectedBranchId ||
        user?.branch?.id ||
        user?.branchId;

    return (
        <GenericCrudPage
            title="Shift Report"
            subtitle="Cashier shift reports and sales summaries"
            columns={tableColumns.shifts}
            fields={[]}
            initialValues={{}}
            loadData={() =>
                shiftReportService.getByBranch(branchId)
            }
            createData={shiftReportService.startShift}
            updateData={null}
            deleteData={null}
            disableCreate
        />
    );
}