import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Typography,
} from '@mui/material';

import { formatCurrency } from '../../utils/formatters.js';

export default function ProductCard({ product, onAdd }) {
    return (
        <Card variant="outlined" sx={{ height: '100%' }}>
            <CardActionArea
                onClick={() => onAdd(product)}
                sx={{ height: '100%' }}
            >
                <CardContent>
                    <Box
                        component="img"
                        src={
                            product.image ||
                            'https://placehold.co/300x300?text=Product'
                        }
                        alt={product.name}
                        sx={{
                            width: '100%',
                            height: 150,
                            objectFit: 'cover',
                            borderRadius: 2,
                            mb: 2,
                            bgcolor: 'action.hover',
                        }}
                    />

                    <Typography fontWeight={900} className="line-clamp-2">
                        {product.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {product.sku}
                    </Typography>

                    <Box
                        sx={{
                            mt: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography color="success.main" variant="h6">
                            {formatCurrency(product.sellingPrice)}
                        </Typography>

                        <Chip
                            size="small"
                            label={
                                product.category?.name ||
                                product.categoryName ||
                                'item'
                            }
                        />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}