import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MenuIcon from "@mui/icons-material/Menu";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useEffect, useMemo, useState } from "react";

import ProductCard from "../../components/pos/ProductCard.jsx";

import { customerService } from "../../services/customerService.js";
import { orderService } from "../../services/orderService.js";
import { productService } from "../../services/productService.js";

import { useAppState } from "../../hooks/useAppState.js";
import { useAuth } from "../../hooks/useAuth.js";
import { formatCurrency } from "../../utils/formatters.js";

export default function POSTerminalPage() {
    const { user } = useAuth();
    const { selectedStoreId, selectedBranchId, notify } = useAppState();

    const storeId = selectedStoreId || user?.store?.id || user?.storeId;
    const branchId = selectedBranchId || user?.branch?.id || user?.branchId;

    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [cart, setCart] = useState([]);

    const [search, setSearch] = useState("");
    const [discount, setDiscount] = useState(0);
    const [paymentType, setPaymentType] = useState("CASH");
    const [customerId, setCustomerId] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        if (!storeId) return;

        productService
            .getByStore(storeId)
            .then(setProducts)
            .catch(() => setProducts([]));

        customerService
            .getAll()
            .then(setCustomers)
            .catch(() => setCustomers([]));
    }, [storeId]);

    const visible = useMemo(
        () =>
            products.filter((p) =>
                `${p.name} ${p.sku}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
            ),
        [products, search]
    );

    const add = (product) =>
        setCart((prev) => {
            const found = prev.find((i) => i.product.id === product.id);

            return found
                ? prev.map((i) =>
                    i.product.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
                : [
                    ...prev,
                    {
                        product,
                        quantity: 1,
                        price: Number(product.sellingPrice || 0),
                    },
                ];
        });

    const qty = (id, value) =>
        setCart((prev) =>
            prev
                .map((i) =>
                    i.product.id === id
                        ? {
                            ...i,
                            quantity: Math.max(0, i.quantity + value),
                        }
                        : i
                )
                .filter((i) => i.quantity > 0)
        );

    const subtotal = cart.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );

    const total = Math.max(0, subtotal - Number(discount || 0));

    const place = async () => {
        if (!cart.length) {
            notify("Please add products to cart", "warning");
            return;
        }

        const payload = {
            branchId,
            customerId: customerId !== "" ? Number(customerId) : null,
            cashierId: user?.id,
            paymentType,
            orderStatus: "COMPLETED",
            totalAmount: total,
            note,
            items: cart.map((i) => ({
                productId: i.product.id,
                quantity: i.quantity,
                price: i.price,
            })),
        };

        console.log("Order Payload:", payload);

        try {
            const order = await orderService.create(payload);

            console.log("Order Response:", order);

            notify("Order placed successfully");

            setCart([]);
            setDiscount(0);
            setCustomerId("");
            setNote("");
        } catch (error) {
            console.error("Order Create Error:", error);
            notify("Unable to place order. Please check backend OrderDto fields.", "error");
        }
    };

    const inputStyle = {
        "& .MuiInputBase-root": {
            height: 42,
            fontSize: 14,
            borderRadius: 2,
        },
        "& input": {
            py: 1,
        },
    };

    const cardStyle = {
        borderRadius: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    };

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 96px)",
                fontSize: 14,
                "& .MuiTypography-root": {
                    lineHeight: 1.35,
                },
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1.5 }}
            >
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Button
                        variant="contained"
                        sx={{
                            minWidth: 42,
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </Button>

                    <Box>
                        <Typography variant="h6" fontWeight={800}>
                            POS Terminal
                        </Typography>

                        <Typography fontSize={14} color="text.secondary">
                            Create new order
                        </Typography>
                    </Box>
                </Stack>
            </Stack>

            <Grid container spacing={1.5}>
                <Grid item xs={12} lg={4}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search products or scan barcode"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={inputStyle}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Typography fontSize={14} sx={{ mt: 1.5, mb: 1 }}>
                        {visible.length} products found
                    </Typography>

                    <Grid
                        container
                        spacing={1.3}
                        sx={{
                            maxHeight: "69vh",
                            overflow: "auto",
                            pr: 0.5,
                            "& .MuiCard-root": {
                                borderRadius: 3,
                            },
                            "& img": {
                                height: "140px !important",
                                objectFit: "cover",
                            },
                            "& .MuiTypography-root": {
                                fontSize: "13px",
                            },
                            "& .MuiTypography-h6": {
                                fontSize: "14px",
                            },
                        }}
                    >
                        {visible.map((p) => (
                            <Grid item xs={6} sm={4} md={3} lg={6} xl={4} key={p.id}>
                                <ProductCard product={p} onAdd={add} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={5}>
                    <Card variant="outlined" sx={{ ...cardStyle, minHeight: "72vh" }}>
                        <CardContent sx={{ p: 2 }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ mb: 1.5 }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight={800}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <ShoppingCartIcon sx={{ mr: 1, fontSize: 22 }} />
                                    Cart ({cart.length} items)
                                </Typography>

                                <Button
                                    startIcon={<DeleteOutlineIcon fontSize="small" />}
                                    variant="outlined"
                                    size="small"
                                    onClick={() => setCart([])}
                                    sx={{
                                        height: 34,
                                        fontSize: 13,
                                        borderRadius: 2,
                                    }}
                                >
                                    Clear
                                </Button>
                            </Stack>

                            {cart.length === 0 ? (
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        minHeight: 300,
                                        color: "text.secondary",
                                    }}
                                >
                                    <ShoppingCartIcon
                                        sx={{
                                            fontSize: 70,
                                            opacity: 0.3,
                                        }}
                                    />

                                    <Typography variant="subtitle1" fontWeight={800}>
                                        Cart is empty
                                    </Typography>

                                    <Typography fontSize={14}>
                                        Add products to start an order
                                    </Typography>
                                </Stack>
                            ) : (
                                <Stack spacing={1.2}>
                                    {cart.map((item) => (
                                        <Card
                                            variant="outlined"
                                            key={item.product.id}
                                            sx={cardStyle}
                                        >
                                            <CardContent sx={{ p: 1.5 }}>
                                                <Stack
                                                    direction={{
                                                        xs: "column",
                                                        md: "row",
                                                    }}
                                                    justifyContent="space-between"
                                                    spacing={1.5}
                                                >
                                                    <Box>
                                                        <Typography fontSize={14} fontWeight={800}>
                                                            {item.product.name}
                                                        </Typography>

                                                        <Typography fontSize={12} color="text.secondary">
                                                            {item.product.sku}
                                                        </Typography>
                                                    </Box>

                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        spacing={0.7}
                                                    >
                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                qty(item.product.id, -1)
                                                            }
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>

                                                        <Typography fontSize={14} fontWeight={800}>
                                                            {item.quantity}
                                                        </Typography>

                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                qty(item.product.id, 1)
                                                            }
                                                        >
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>

                                                        <Typography fontSize={14} fontWeight={800}>
                                                            {formatCurrency(item.price)}
                                                        </Typography>

                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() =>
                                                                qty(
                                                                    item.product.id,
                                                                    -item.quantity
                                                                )
                                                            }
                                                        >
                                                            <DeleteOutlineIcon fontSize="small" />
                                                        </IconButton>
                                                    </Stack>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Stack>
                            )}

                            <Divider sx={{ my: 1.5 }} />

                            <Stack spacing={0.8}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography fontSize={14}>Subtotal:</Typography>
                                    <Typography fontSize={14}>
                                        {formatCurrency(subtotal)}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" justifyContent="space-between">
                                    <Typography fontSize={14}>Discount:</Typography>
                                    <Typography fontSize={14} color="error">
                                        - {formatCurrency(Number(discount || 0))}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="subtitle1" fontWeight={800}>
                                        Total:
                                    </Typography>

                                    <Typography
                                        color="success.main"
                                        variant="subtitle1"
                                        fontWeight={900}
                                    >
                                        {formatCurrency(total)}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={3}>
                    <Card variant="outlined" sx={cardStyle}>
                        <CardContent sx={{ p: 2 }}>
                            <Typography variant="h6" fontWeight={800} sx={{ mb: 1.5 }}>
                                Customer
                            </Typography>

                            <TextField
                                select
                                SelectProps={{ native: true }}
                                fullWidth
                                size="small"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                                sx={inputStyle}
                            >
                                <option value="">Select Customer</option>

                                {customers.map((c) => (
                                    <option key={c.id} value={String(c.id)}>
                                        {c.fullName}
                                    </option>
                                ))}
                            </TextField>

                            {/* <Divider sx={{ my: 2 }} /> */}

                            {/* <Typography variant="h6" fontWeight={800} sx={{ mb: 1.5 }}>
                                Discount
                            </Typography>

                            <TextField
                                fullWidth
                                size="small"
                                type="number"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                sx={inputStyle}
                            /> */}

                            {/* <Divider sx={{ my: 2 }} /> */}
                            {/* 
                            <Typography variant="h6" fontWeight={800} sx={{ mb: 1.5 }}>
                                Order Note
                            </Typography>

                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                size="small"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        fontSize: 14,
                                        borderRadius: 2,
                                    },
                                }}
                            /> */}

                            <Divider sx={{ my: 2 }} />

                            <Typography
                                textAlign="center"
                                color="success.main"
                                variant="h5"
                                fontWeight={900}
                            >
                                {formatCurrency(total)}
                            </Typography>

                            <Typography
                                textAlign="center"
                                fontSize={13}
                                color="text.secondary"
                            >
                                Total Amount
                            </Typography>

                            <Stack spacing={1} sx={{ mt: 2 }}>
                                <TextField
                                    select
                                    SelectProps={{ native: true }}
                                    size="small"
                                    value={paymentType}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                    sx={inputStyle}
                                >
                                    <option value="CASH">CASH</option>
                                    <option value="CARD">CARD</option>
                                    <option value="UPI">UPI</option>
                                </TextField>

                                <Button
                                    variant="contained"
                                    size="medium"
                                    disabled={!cart.length}
                                    onClick={place}
                                    sx={{
                                        height: 40,
                                        fontSize: 13,
                                        borderRadius: 2,
                                        fontWeight: 800,
                                    }}
                                >
                                    Process Payment
                                </Button>

                                <Button
                                    variant="outlined"
                                    size="medium"
                                    sx={{
                                        height: 40,
                                        fontSize: 13,
                                        borderRadius: 2,
                                        fontWeight: 800,
                                    }}
                                >
                                    Hold Order
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}