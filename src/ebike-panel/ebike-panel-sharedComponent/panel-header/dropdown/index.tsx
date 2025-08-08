import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from '@mui/material';

// const StyledMenu = styled((props: MenuProps) => (
//     <Menu
//         elevation={0}
//         anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//         }}
//         transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//         }}
//         {...props}
//     />
// ))(({ theme }) => ({
//     '& .MuiPaper-root': {
//         // borderRadius: 6,
//         marginTop: theme.spacing(1),
//         // minWidth: 180,
//         color: 'rgb(55, 65, 81)',
//         boxShadow:
//             'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//         '& .MuiMenu-list': {
//             padding: '4px 0',
//         },
//         '& .MuiMenuItem-root': {
//             '& .MuiSvgIcon-root': {
//                 fontSize: 18,
//                 color: theme.palette.text.secondary,
//                 marginRight: theme.spacing(1.5),
//                 ...theme.applyStyles('dark', {
//                     color: 'inherit',
//                 }),
//             },
//             '&:active': {
//                 backgroundColor: alpha(
//                     theme.palette.primary.main,
//                     theme.palette.action.selectedOpacity,
//                 ),
//             },
//         },
//         ...theme.applyStyles('dark', {
//             color: theme.palette.grey[300],
//         }),
//     },
// }));


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '0px',
        // backgroundColor: '#f5f5f5', // 🟢 Set to white smoke
        marginTop: theme.spacing(1),
        color: '#000', // 🟢 Set text color to black
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            color: '#000', // 🟢 Text color for menu items
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: '#000', // 🟢 Icon color
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));



export default function DropwDownMenu({ props }: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                disableRipple
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                    backgroundColor: "white",
                    color: '#181818',
                    textTransform: 'capitalize',
                    transition: 'all 1s ease',
                    '&:hover': {
                        backgroundColor: 'white',
                        color: '#181818',
                    }
                }}
            >
                {props?.heading}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
            >
                {
                    props?.option.map((e: any, i: any) => {
                        return (
                            <Link href={`/ebike-panel/dashboard/${e?.OptionRoute}`} key={i} sx={{ textDecoration: 'none', color: '#181818' }} >
                                <MenuItem onClick={handleClose} disableRipple>
                                    {e?.OptionName}
                                </MenuItem>
                            </Link>
                        )
                    })
                }
            </StyledMenu>
        </div>
    );
}
