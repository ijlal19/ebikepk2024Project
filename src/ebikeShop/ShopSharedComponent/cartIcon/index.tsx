import { GetUserCart } from '@/ebikeShop/Shopfunctions/globalFuntions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { isLoginUser } from '@/genericFunctions/geneFunc';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconButton } from '@mui/material';
import styles from './index.module.scss';
const CartIcon = () => {

    const [IsLogin, setIsLogin] = useState<any>('not_login');
    const [MyCartdata, setMyCart] = useState<any>([])
    const router = useRouter()

    useEffect(() => {
        let _isLoginUser = isLoginUser()
        if (_isLoginUser?.login) {
            setIsLogin(_isLoginUser.info)
            fecthUserCart(_isLoginUser?.info?.id)
            return
        }
        else {
            setIsLogin("not_login")
        }
    }, [])

    const fecthUserCart = async (id: any) => {
        const obj = {
            userId: id
        }
        const usercart = await GetUserCart(obj)
        setMyCart(usercart)
    }

    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }: any) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const handleCart = () => {
        router.push('/shop/cart')
    }

    return (
        <IconButton aria-label="cart" className={styles.cart_button} onClick={() => handleCart()}>
            <StyledBadge badgeContent={MyCartdata?.length > 0 ? MyCartdata?.length : '0'} color="primary">
                <ShoppingCartIcon />
            </StyledBadge>
        </IconButton>
    )
}
export default CartIcon