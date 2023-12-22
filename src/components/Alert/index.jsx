import { Button } from "@mui/material";
import icons from "@/utils/icons";
import { useModalBackPress } from "../CustomHook";

function Alert({ open, animation, data, handleClose = () => {} }) {
  useModalBackPress({
    open: open,
    hide: handleClose,
  });

  return (
    open && (
      <div className="alert-layer">
        <AlertBox animation={animation}>
          <div className="alert-content">
            <div className="alert-icon">
              <Icon type={data.icon} />
            </div>
            <h3 className="alert-title">{data?.title}</h3>
            <p className="alert-extra-info">{data?.extraInfo}</p>
          </div>
          <div className="alert-btns-wrap">
            {data.buttons.map((btn, i) => {
              return <Btn data={btn} key={i} />;
            })}
          </div>
        </AlertBox>
      </div>
    )
  );
}

const AlertBox = ({ animation, children }) => {
  const animations = [
    {
      name: "scale",
      value: "scale",
    },
    {
      name: "slide-top",
      value: "slideTop",
    },
    {
      name: "slide-bottom",
      value: "slideBottom",
    },
  ];
  const ani = animations.filter((ani) => ani.name === animation);
  return <div className={"alert-box" + " ani-" + ani[0].value}>{children}</div>;
};

const Icon = ({ type }) => {
  switch (type) {
    case "success":
      return <span className="c-success">{icons.check}</span>;
    case "error":
      return <span className="c-error">{icons.error}</span>;
    case "delete":
      return <span className="c-error">{icons.delete}</span>;
    case "warning":
      return <span className="c-warning">{icons.warning}</span>;
    case "logout":
      return <span className="c-error">{icons.logout}</span>;
  }
};

const Btn = ({ data }) => {
  return (
    <Button variant="contained" color={data.type} onClick={data.callback}>
      {data.text}
    </Button>
  );
};

export default Alert;
