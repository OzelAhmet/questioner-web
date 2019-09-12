import React, { useContext, useState, useEffect } from 'react';

import THEMES from './Colors';

export const ThemeContext = React.createContext();

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(THEMES.light);

    return (
        <ThemeContext.Provider value={{ theme:theme, themes:THEMES, setTheme:setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export function withTheme(Component) {
    return props => {
        const { theme, themes, setTheme } = useContext(ThemeContext);

        // const getTheme = themeID => THEMES.find(theme => theme.key === themeID);
        // const setTheme = theme => setTheme(theme);

        // return Component({theme: getTheme(themeID), themes: THEMES, setTheme: setTheme, ...props});

        return (
            <Component
                {...props}
                themes={themes}
                theme={theme}
                setTheme={setTheme}
            />
        );

    };
}