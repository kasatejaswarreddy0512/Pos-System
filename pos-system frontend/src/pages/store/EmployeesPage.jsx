import { useEffect, useMemo, useState } from "react";

import GenericCrudPage from "../crud/GenericCrudPage.jsx";

import {
    employeeFields,
    schemas,
    tableColumns,
} from "../crud/entityConfigs.jsx";

import { employeeService } from "../../services/employeeService.js";
import { branchService } from "../../services/branchService.js";

import { useAuth } from "../../hooks/useAuth.js";
import { useAppState } from "../../hooks/useAppState.js";

import { ROLES } from "../../constants/roles.js";

const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: ROLES.BRANCH_CASHIER,
    storeId: "",
    branchId: "",
};

const toNumberOrNull = (value) => {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    const num = Number(value);
    return Number.isNaN(num) ? null : num;
};

const isStoreAdminRole = (role) => {
    return role === ROLES.STORE_ADMIN || role === "ROLE_STORE_ADMIN";
};

export default function EmployeesPage({ scope = "store" }) {
    const { user, role } = useAuth();

    const { selectedStoreId, selectedBranchId } = useAppState();

    const [branches, setBranches] = useState([]);

    const loggedInRole = role || user?.role;

    const isStoreAdmin = isStoreAdminRole(loggedInRole);

    const loggedInStoreId = toNumberOrNull(
        user?.store?.id || user?.storeId
    );

    const selectedStore = toNumberOrNull(selectedStoreId);

    const loggedInBranchId = toNumberOrNull(
        selectedBranchId || user?.branch?.id || user?.branchId
    );

    const isBranchScope = scope === "branch";

    useEffect(() => {
        const loadBranches = async () => {
            try {
                let data = [];

                if (isStoreAdmin) {
                    data = await branchService.getMyStoreBranches();
                } else if (selectedStore || loggedInStoreId) {
                    data = await branchService.getByStore(selectedStore || loggedInStoreId);
                }

                setBranches(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to load branches", error);
                setBranches([]);
            }
        };

        loadBranches();
    }, [isStoreAdmin, selectedStore, loggedInStoreId]);

    const branchOptions = useMemo(() => {
        return branches.map((branch) => ({
            label:
                branch.name ||
                branch.branchName ||
                branch.title ||
                `Branch ${branch.id}`,
            value: branch.id,
        }));
    }, [branches]);

    const fields = useMemo(() => {
        const branchField = {
            name: "branchId",
            label: "Branch",
            type: "select",
            placeholder: "Select Branch",
            options: branchOptions,
        };

        const hasBranchIdField = employeeFields.some(
            (field) => field.name === "branchId"
        );

        if (hasBranchIdField) {
            return employeeFields.map((field) => {
                if (field.name === "branchId") {
                    return branchField;
                }

                return field;
            });
        }

        return [...employeeFields, branchField];
    }, [branchOptions]);

    const loadEmployees = () => {
        if (isBranchScope) {
            if (!loggedInBranchId) {
                return [];
            }

            return employeeService.getByBranch(loggedInBranchId);
        }

        if (isStoreAdmin) {
            return employeeService.getMyStoreEmployees();
        }

        const finalStoreId = selectedStore || loggedInStoreId;

        if (finalStoreId) {
            return employeeService.getByStore(finalStoreId);
        }

        return [];
    };

    const createEmployee = (payload) => {
        const finalBranchId = toNumberOrNull(payload?.branchId || loggedInBranchId);

        if (!finalBranchId) {
            throw new Error("Please select branch.");
        }

        const selectedBranch = branches.find(
            (branch) => Number(branch.id) === Number(finalBranchId)
        );

        const branchStoreId = toNumberOrNull(
            selectedBranch?.storeId || selectedBranch?.store?.id
        );

        const finalStoreId = toNumberOrNull(
            payload?.storeId ||
            branchStoreId ||
            loggedInStoreId ||
            selectedStore
        );

        if (!finalStoreId) {
            throw new Error("Store ID is required to create employee.");
        }

        const requestBody = {
            ...payload,
            storeId: finalStoreId,
            branchId: finalBranchId,
        };

        return employeeService.createForStore(finalStoreId, requestBody);
    };

    return (
        <GenericCrudPage
            title="Employee"
            subtitle="Manage employees, managers and cashiers"
            columns={tableColumns.employees}
            fields={fields}
            initialValues={initialValues}
            validationSchema={schemas.employee}
            loadData={loadEmployees}
            createData={createEmployee}
            updateData={employeeService.update}
            deleteData={employeeService.remove}
        />
    );
}