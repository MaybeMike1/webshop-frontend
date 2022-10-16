import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';


import './../style/footer.css'
interface FooterComponentProps {}
const Footer: React.FC<FooterComponentProps> = () => {
  return (
    <div className="footer">
      <div className="info">
        <div>
          30
          <span>Days of refund</span>
        </div>
        <div>
          Safe
          <span>The shipping</span>
        </div>

        <div>
          30
          <span>Days of Pricematch</span>
        </div>
        <div>
          34.000+
          <span>Products</span>
        </div>
      </div>
      <div className="contacts">
        <div className="socials">
            <div><TwitterIcon/></div>
            <div><FacebookIcon/></div>
            <div><YouTubeIcon/></div>
        </div>
      </div>
      <div className="copy-right">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
      </div>
    </div>
  )
}

export default Footer
