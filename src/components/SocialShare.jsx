"use client";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { useDispatch, useSelector } from "react-redux";
import Model from "./Model";
import { success } from "./Toast";
import { setShare } from "@/redux/reducers/appReducer";
import { useModalBackPress } from "./CustomHook";
import icons from "@/utils/icons";

const SocialShare = () => {
  const dispatch = useDispatch();
  const { shareOpen, shareURL } = useSelector((state) => state.app);
  const handleCopy = () => {
    navigator.clipboard.writeText(shareURL);
    success("Link copied to clipboard");
    dispatch(setShare({ open: false }));
  };

  useModalBackPress({
    open: shareOpen,
    hide: () => dispatch(setShare({ open: false })),
  });

  return (
    <Model
      open={shareOpen}
      width={450}
      hideCloseBtn={true}
      onClose={() => dispatch(setShare({ open: false }))}
    >
      <div className="model-body">
        <Grid sx={{ mx: 1, mt: 1 }}>
          <Typography variant="h7" component="h4">
            Share
          </Typography>
        </Grid>

        <Grid sx={{ mt: 2 }}>
          <div className="s-btn-con">
            <FacebookShareButton url={shareURL}>
              <FacebookIcon round={true} size={50} />
              <Typography>Facebook</Typography>
            </FacebookShareButton>

            <TwitterShareButton url={shareURL}>
              <TwitterIcon round={true} size={50} />
              <Typography>Twitter</Typography>
            </TwitterShareButton>

            <EmailShareButton url={shareURL}>
              <EmailIcon round={true} size={50} />
              <Typography>Email</Typography>
            </EmailShareButton>

            <LinkedinShareButton url={shareURL}>
              <LinkedinIcon round={true} size={50} />
              <Typography>Linkedin</Typography>
            </LinkedinShareButton>

            <TelegramShareButton url={shareURL}>
              <TelegramIcon round={true} size={50} />
              <Typography>Telegram</Typography>
            </TelegramShareButton>

            <WhatsappShareButton url={shareURL}>
              <WhatsappIcon round={true} size={50} />
              <Typography>Whatsapp</Typography>
            </WhatsappShareButton>

            <PinterestShareButton url={shareURL}>
              <PinterestIcon round={true} size={50} />
              <Typography>Pinterest</Typography>
            </PinterestShareButton>
          </div>
          <div className="s-url-container">
            <input value={shareURL} type="text" readOnly={true} />
            <Button
              variant="contained"
              onClick={handleCopy}
              style={{ width: 120 }}
            >
              {icons.copy} &nbsp; Copy
            </Button>
          </div>
        </Grid>
      </div>
    </Model>
  );
};

export default SocialShare;
