import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppMenu } from "./menu";
import { Button, Collapse, Dropdown, Image } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

const IS_COLLAPSED_KEY = "isCollapsed";

export const AppLayout = () => {
  const [menuIsExpanded, setMenuIsExpanded] = useState<boolean>(
    localStorage.getItem(IS_COLLAPSED_KEY) === "true"
  );

  useEffect(() => {
    localStorage.setItem(IS_COLLAPSED_KEY, menuIsExpanded.toString());
  }, [menuIsExpanded]);

  return (
    <div className={"app-layout"}>
      <header>
        <div className={"app-layout__title"}>
          <Button
            variant={"dark"}
            onClick={() => {
              setMenuIsExpanded(!menuIsExpanded);
            }}
          >
            <IoMdMenu />
          </Button>
          <h4>Home manager</h4>
        </div>
        <div className={"app-layout__avatar"}>
          <span>Ricardo Vaz Correa</span>
          <Image
            src={
              "https://media.licdn.com/dms/image/D4D03AQEwAiuNKuiEsA/profile-displayphoto-shrink_100_100/0/1674217456441?e=1684368000&v=beta&t=CempU2gPU5dnFGq0Vc5XihD168MKZ_xCEtU_xzP3cCs"
            }
            roundedCircle
          />
          <Dropdown>
            <Dropdown.Toggle variant={"dark"}>
              <FaEllipsisV />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href='#'>Sair</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <main>
        <Collapse in={menuIsExpanded} dimension={"width"}>
          <nav>
            <AppMenu />
          </nav>
        </Collapse>
        <div className='app-layout__content'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
