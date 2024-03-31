import Link from "next/link";
import React, { useState } from "react";
import { MenuMenu, MenuItem, Menu } from "semantic-ui-react";
const Header = () => {
  const [activeItem, setActiveItem] = useState("browse");
  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <div>
      <Menu style={{ marginTop: "10px" }}>
        <Link href="/" passHref className="item">
          Code Cat
        </Link>

        <MenuMenu position="right">
          <Link href="/" passHref className="item">
            Campaigns
          </Link>

          <Link href="/campaign/new" passHref className="item">
            +
          </Link>
        </MenuMenu>
      </Menu>
    </div>
  );
};
export default Header;
