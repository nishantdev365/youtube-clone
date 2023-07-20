
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchDataFromApi } from "../utils/api";
export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        fetchSelectedCategoryData(selectedCategory);
    }, [selectedCategory]);

    const fetchSelectedCategoryData = (query) => {
        setLoading(true);
        fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
            console.log(contents);
            setSearchResults(contents);
            setLoading(false);
        });
    };

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }, []);
      useEffect(() => {
        if (theme === "dark") {
          document.getElementById("root").classList.add("dark");
        } else {
          document.getElementById("root").classList.remove("dark");
        }
      }, [theme]);

    return (
        <Context.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                selectedCategory,
                setSelectedCategory,
                mobileMenu,
                setMobileMenu,
                theme,
                setTheme,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

AppContext.propTypes = {
    children: PropTypes.node.isRequired,
  };
