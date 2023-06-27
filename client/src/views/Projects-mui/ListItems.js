import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

import ExtensionIcon from '@mui/icons-material/Extension';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ApartmentIcon from '@mui/icons-material/Apartment';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <FactCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary="Verification" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Tools
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <ExtensionIcon />
            </ListItemIcon>
            <ListItemText primary="Code Creator" />
        </ListItemButton>
    </React.Fragment>
);