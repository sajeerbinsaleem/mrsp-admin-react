import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import { changeActiveSidebarItem } from "../../actions/navigation.js";
import { logoutUser } from "../../actions/auth.js";
import SofiaLogo from "../Icons/SidebarIcons/SofiaLogo.js";
import * as Icons from "@material-ui/icons";
import store from "../../store";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    activeItem: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      authRole: store.getState().user.role,
    };
  }

  componentDidMount() {
    this.element.addEventListener(
      "transitionend",
      () => {
        if (this.props.sidebarOpened) {
          this.element.classList.add(s.sidebarOpen);
        }
      },
      false
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.sidebarOpened !== prevProps.sidebarOpened) {
      if (this.props.sidebarOpened) {
        this.element.style.height = `276px`;
      } else {
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = "0px";
        }, 0);
      }
    }
  }

  render() {
    return (
      <nav
        className={s.root}
        ref={(nav) => {
          this.element = nav;
        }}
      >
        <header className={s.logo}>
          <SofiaLogo />
          <span className={s.title}>MISTERSHOPPIE</span>
        </header>
        <ul className={s.nav}>
          <LinksGroup
            activeItem={this.props.activeItem}
            header="Dashboard"
            isHeader
            iconName={<i className={"eva eva-home-outline"} />}
            link="/app/dashboard"
            index="dashboard"
            badge="9"
          />

          <h5 className={s.navTitle}>Menus</h5>

          <LinksGroup
            activeItem={this.props.activeItem}
            header="Orders"
            isHeader
            iconName={<Icons.Money />}
            link="/app/orders"
            index="Orders"
          />
          {this.state.authRole == "admin" ? (
            <LinksGroup
              activeItem={this.props.activeItem}
              header="Franchise"
              isHeader
              iconName={<Icons.EmojiTransportation />}
              link="/app/franchise"
              index="Franchise"
            />
          ) : (
            ""
          )}

          <LinksGroup
            activeItem={this.props.activeItem}
            header="Shops"
            isHeader
            iconName={<Icons.Apartment />}
            link="/app/stores"
            index="shops"
          />
          <LinksGroup
            activeItem={this.props.activeItem}
            header="Delivery boys"
            isHeader
            iconName={<Icons.DirectionsBike />}
            link="/app/delivery-boys"
            index="tables"
          />
          {/* <LinksGroup
            activeItem={this.props.activeItem}
            header="App users"
            isHeader
            iconName={<Icons.NaturePeople />}
            link="/app/customers"
            index="tables"
          /> */}
          {/* <LinksGroup
            activeItem={this.props.activeItem}
            header="Locations"
            isHeader
            iconName={<Icons.NaturePeople />}
            link="/app/locations"
            index="tables"
          /> */}
          {/* <LinksGroup
            activeItem={this.props.activeItem}
            header="Notifications"
            isHeader
            iconName={<i className={'eva eva-bell-outline'}/>}
            link="/app/notifications"
            index="notifications"
          /> */}
          {/* <LinksGroup
            activeItem={this.props.activeItem}
            header="Reports"
            isHeader
            iconName={<Icons.TrendingUp />}
            link="/app/uielements"
            index="uielements"
            childrenLinks={[
              {
                header: 'Order', link: '/app/ui-elements/charts',
              },
              {
                header: 'Delievry', link: '/app/ui-elements/icons',
              },
              {
                header: 'Google Maps', link: '/app/ui-elements/maps',
              },
            ]}
          /> */}
        </ul>
      </nav>
    );
  }
}

// function mapStateToProps(store) {
//   return {
//     sidebarOpened: store.navigation.sidebarOpened,
//     activeItem: store.navigation.activeItem,
//   };
// }

// export default withRouter(connect(mapStateToProps)(Sidebar));
export default Sidebar;
