import Link from "next/link";
import React from "react";
import { MenuMenu, Menu } from "semantic-ui-react";
import { Routes } from "../routes";
import factory from "../ethereum/factory";

const Header = () => {


  return (
    <div>
      <Menu style={{ marginTop: "10px" }}>
        <Link href="/" passHref className="item">
          Code Cat
        </Link>

        <MenuMenu position="right">
          <Link href={Routes.Home} passHref className="item">
            Campaigns
          </Link>

          <Link href={Routes.NewCampaign} passHref className="item">
            +
          </Link>
        </MenuMenu>
      </Menu>
    </div>
  );
};
export async function getServerSideProps() {
  return {
    props: {
      campaigns: await factory.methods.().call(),
    },
  };
}
export default Header;
