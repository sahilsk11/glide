import React, { useState } from "react";
import "./footer.css";

import EmailSignup from "./EmailSignup/EmailSignup";

export default function Footer({ host }) {
  const [numDocuments, updateNumDocuments] = useState("?");
  fetch(host + "/countDocuments")
    .then(r => r.json())
    .then(data => {
      updateNumDocuments(data.numDocuments)
    })
  return (
    <>
      <EmailSignup host={host} />
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-text-col">
            <Text numDocuments={numDocuments} />
          </div>
          <div className="footer-img-col">
            <img alt="" src="./img/icon.svg" className="footer-icon" />
          </div>
        </div>
      </div>
    </>
  );
}

function Text({ numDocuments }) {
  const makerComponent = (
    <>
      <MakerLink name="Sahil" link="https://twitter.com/sahil_sk11" />
      ,&nbsp;<MakerLink name="Saaniya" link="https://twitter.com/saaniya_kapur" />
      , and <MakerLink name="Sameer" link="https://twitter.com/sameerskapur" /> (not related)

    </>
  );
  const donate = <a className="maker-link" href="https://www.buymeacoffee.com/sahilkapur" target="_blank">Support us here</a>
  const howItsMade = <a className="maker-link" href="https://github.com/sahilsk11/resume-scanner" target="_blank">Check out our GitHub</a>
  const privacy = <a className="maker-link" href="https://www.notion.so/Glide-Privacy-Policy-and-Terms-of-Use-86d9f1a914704f86ae8ebbb3ec70ca24" target="_blank">Privacy Policy</a>
  return (
    <div>
      {/* <Pair keyName="Special Thanks" value={betaComponent} /> */}
      <Pair keyName="Makers:" value={makerComponent} />
      <Pair keyName="How we Made This:" value={howItsMade} />
      <Pair keyName="Fine Print:" value={privacy} />
      <Pair keyName="Feeling Generous?" value={donate} />
      <Pair keyName="Resumes Processed:" value={numDocuments.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
      <em><p style={{ fontFamily: "Inter", marginTop: "40px" }}>Copyright © 2021 Glide. All rights reserved.</p></em>
      <ProductHuntTag />
      <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="sahilkapur" data-color="#FFDD00" data-emoji="" data-font="Lato" data-text="Support Glide" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" ></script>
      
    </div>
  );
}

function MakerLink({ name, link }) {
  return (
    <a href={link} target="_blank" className="maker-link">{name} Kapur</a>
  )
}

function Pair({ keyName, value }) {
  return (
    <>
      <p className="footer-text">
        <b className="footer-key">{keyName}&nbsp;</b>
        {value}
      </p>
    </>
  )
}

function ProductHuntTag() {
  return (
    <div className="product-hunt-tag">
      <a href="https://www.producthunt.com/posts/glide-cv?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-glide-cv" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=281317&theme=light&period=daily" alt="Glide CV - Debug your resume | Product Hunt" style={{ "width": "250px", "height": "54px" }} width="250" height="54" /></a>
    </div>
  )
}