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
        if (!branchId) return;

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

    const loadRefunds = async () => {
        const [refunds, orderList] = await Promise.all([
            refundService.getByBranch(branchId),
            orderService.getByBranch(branchId),
        ]);

        setOrders(orderList);

        return refunds.map((refund) => {
            const orderId =
                refund.orderId ??
                refund.order?.id;

            const order = orderList.find(
                (o) =>
                    String(o.id) ===
                    String(orderId)
            );

            return {
                ...refund,

                orderId:
                    orderId ??
                    order?.id ??
                    null,

                cashierName:
                    refund.cashierName ??
                    refund.cashier?.fullName ??
                    order?.cashier?.fullName ??
                    "-",

                paymentType:
                    refund.paymentType ??
                    refund.paymentMethod ??
                    order?.paymentType ??
                    "-",
            };
        });
    };

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
            loadData={loadRefunds}
            createData={refundService.create}
            updateData={null}
            deleteData={refundService.remove}
        />
    );
}