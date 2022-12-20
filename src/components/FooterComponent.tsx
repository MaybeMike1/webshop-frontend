import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';


import './../style/footer.scss'
import { Container } from '@mui/material';

interface FooterComponentProps {}
const Footer: React.FC<FooterComponentProps> = () => {
  function getCurrentYear() {
    return new Date().getFullYear();
  }
  return (
    
    <Container maxWidth="md" className="footer">
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
        {getCurrentYear()} © All rights reserved
      </div>
    </Container>
  )
}

export default Footer
