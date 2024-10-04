import React, {memo, useState} from "react";
import { AppBar, Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import AdSliderFeature from "../features/AdSlider/AdSlider";
import ProductListFeature from "../features/ProductList";
import ContactFeature from "../features/Contact/Contact";
import Footer from "./Footer";

// CustomTabPanel Component
//use of memo to prevent unnecessary re-renders
const CustomTabPanel = memo(({ value, index, children }) => {
    const isSmallScreen = useMediaQuery('(max-width: 32rem)');
    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
            {value === index && (
                <Box p={3} sx={{ fontSize: isSmallScreen ? 'xx-small' : 'unset' }}>
                    {children}
                </Box>
            )}
        </div>
    );
});

const Main = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <div style={{ margin: 0, padding: 0, width: '100%', height: '100vh' }}>
            <Box
                sx={{
                    backgroundColor: '#ffffff',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                }}
            >
                {/* Top AppBar with Tabs */}
                <AppBar position="static" sx={{ backgroundColor: 'rgb(5,20,54)' }}>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        sx={{ display: 'flex', justifyContent: 'space-around' }}
                        TabIndicatorProps={{ style: { backgroundColor: '#9c7945' } }}>
                        {["Home", "Bestseller", "New Products", "Contact"].map((label, index) => (
                            <Tab key={index} label={label} sx={{ fontSize: '1rem', color: '#9c7945' }} />
                        ))}
                    </Tabs>
                </AppBar>

                {/* Home tab */}
                <CustomTabPanel value={tabIndex} index={0}>
                    <Box sx={{ padding: '10px' }}>
                        <AdSliderFeature />
                    </Box>

                    <Typography variant="h4"><br />Products<br /></Typography>

                    <Box>
                        <ProductListFeature tabIndex={tabIndex} />
                    </Box>
                </CustomTabPanel>

                {/* Bestseller tab */}
                <CustomTabPanel value={tabIndex} index={1}>
                    <Typography variant="h4">Bestseller</Typography>
                    <Box>
                        <ProductListFeature tabIndex={tabIndex} />
                    </Box>
                </CustomTabPanel>

                {/* New Products tab */}
                <CustomTabPanel value={tabIndex} index={2}>
                    <Typography variant="h4">New Products</Typography>
                    <Box>
                        <ProductListFeature tabIndex={tabIndex} />
                    </Box>
                </CustomTabPanel>

                {/* Contact tab */}
                <CustomTabPanel value={tabIndex} index={3}>
                    <ContactFeature />
                </CustomTabPanel>

                <Box sx={{ flexShrink: 0 }}>
                    <Footer />
                </Box>
            </Box>
        </div>
    );
};

export default Main;
