import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import menuConfig from 'constants/menuConfig'
import MenuItem from './MenuItem'
import CollapsibleMenuItem from './CollapsibleMenuItem'
import { List } from './MenuStyle'

function Menu({ drawerOpen, withGradient }) {
  const location = useLocation()

  const activeRoute = useCallback(routeName => location.pathname.indexOf(routeName) > -1, [location.pathname])
  const menuItems = menuConfig

  return (
    menuItems && (
      <nav>
        <List>
          {menuItems.map((menu, key) => {
            const menuItemProps = { key, menu, drawerOpen, activeRoute, withGradient }
            return menu.children ? <CollapsibleMenuItem {...menuItemProps} /> : <MenuItem {...menuItemProps} />
          })}
        </List>
      </nav>
    )
  )
}

Menu.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  withGradient: PropTypes.bool.isRequired
}

export default Menu
