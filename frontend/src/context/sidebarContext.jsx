import { createContext, useReducer } from 'react';
// import PropTypes from 'prop-types';

const initialState = {
  isSidebarOpen: false,
};

const sidebarReducer = (state, action) => {
  if (action.type === 'TOGGLE_SIDEBAR') {
    return { ...state, isSidebarOpen: !state.isSidebarOpen };
  }
  throw new Error(`No matching "${action.type} action type`);
};

export const SidebarContext = createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

export const SidebarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  return (
    <SidebarContext.Provider
      value={{
        ...state,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// SidebarProvider.propTypes = {
//   children: PropTypes.node,
// };
