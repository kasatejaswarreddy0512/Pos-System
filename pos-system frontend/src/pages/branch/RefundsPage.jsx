import { useEffect, useMemo, useState } from "react";

import GenericCrudPage from "../crud/GenericCrudPage.jsx";
import {
    refundFields,
    schemas,
    tableColumns,
} from "../crud/entityConfigs.jsx";

import { orderService } from "../../services/orderService.js";
import { refundService } from "../../services/refundService.js";

import { useAuth } from "../../hooks/useAuth.js";
import { useAppState } from "../../hooks/useAppState.js";

import { formatCurrency } from "../../utils/formatters.js";

export default function RefundsPage() {
    const { user } = useAuth();
    const { selectedBranchId } = useAppState();

    const branchId =
        selectedBranchId ||
        user?.branch?.id ||
        user?.branchId;

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        orderService
            .getByBranch(branchId)
            .then(setOrders)
            .catch(() => setOrders([]));
    }, [branchId]);

    const fields = useMemo(
        () =>
            refundFields(
                orders.map((o) => ({
                    value: o.id,
                    label: `Order #${o.id} - ${formatCurrency(
                        o.totalAmount
                    )}`,
                }))
            ),
        [orders]
    );

    return (
        <GenericCrudPage
            title="Refund"
            subtitle="Manage return and refund transactions"
            columns={tableColumns.refunds}
            fields={fields}
            initialValues={{
                orderId: "",
                reason: "",
                amount: 0,
                paymentType: "CASH",
            }}
            validationSchema={schemas.refund}
            loadData={() =>
                refundService.getByBranch(branchId)
            }
            createData={refundService.create}
            updateData={null}
            deleteData={refundService.remove}
        />
    );
}