import React from 'react';

interface RecipientProps {
  name: string;
  email: string;
}

interface RaadeWorkshopEmailProps {
  recipient: RecipientProps;
}

/**
 * RAADE Workshop Email Template
 * 
 * This component renders an HTML email template for the RAADE Forum Workshops.
 * It includes workshop descriptions, preferences selection, and related information.
 */
const RaadeWorkshopEmail: React.FC<RaadeWorkshopEmailProps> = ({ recipient }) => {
  // RAADE color scheme
  const raadeNavy = "#274675";
  const raadeGold = "#FBB03B";
  
  // Social media links
  const instagramLink = "https://www.instagram.com/rice_aade/";
  const linkedInLink = "https://www.linkedin.com/company/rice-association-for-african-development/posts/?feedView=all";
  const websiteLink = "https://rice-raade.com";
  
  // Workshop preference form link
  const workshopFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSfF2FLv_NBTEeZpV0i2sa9wCwmLEFnJlyOgHD3ShvOtO2jmUQ/viewform?usp=header";
  
  return (
    <div style={{ 
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      maxWidth: "600px", 
      margin: "0 auto",
      padding: "20px",
      color: "#333",
      lineHeight: "1.6"
    }}>
      {/* Email Header */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <div style={{ 
          backgroundColor: raadeNavy, 
          padding: "20px", 
          borderRadius: "8px 8px 0 0",
          textAlign: "center"
        }}>
          <h1 style={{ 
            color: "white", 
            margin: "0",
            fontFamily: "Georgia, serif",  // Web-safe alternative to Simula
            fontSize: "28px",
            fontWeight: "bold"
          }}>
            RAADE Forum 2025: Sustainable By Design
          </h1>
        </div>
        <div style={{ 
          backgroundColor: raadeGold, 
          padding: "15px", 
          borderRadius: "0 0 8px 8px",
          color: raadeNavy,
          fontWeight: "bold",
          fontSize: "18px"
        }}>
          Workshop Selection & Case Studies
        </div>
      </div>
      
      {/* Personalized Greeting */}
      <div style={{ marginBottom: "25px" }}>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5",
          fontFamily: "Georgia, serif" // Web-safe alternative to Lora
        }}>
          Hello {recipient.name}!
        </p>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5",
          fontFamily: "Georgia, serif"
        }}>
          We're thrilled to have you join us for what promises to be an impactful and inspiring weekend at Rice University.
        </p>
      </div>
      
      {/* Design Sprint Workshop Section */}
      <div style={{ 
        marginBottom: "30px", 
        border: `2px solid ${raadeNavy}`,
        borderRadius: "8px",
        padding: "20px"
      }}>
        <h2 style={{ 
          color: raadeNavy, 
          marginTop: "0",
          fontFamily: "Georgia, serif",
          fontSize: "22px",
          borderBottom: `2px solid ${raadeGold}`,
          paddingBottom: "10px"
        }}>
          Design Sprint Workshops
        </h2>
        
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5",
          fontFamily: "Georgia, serif",
          margin: "15px 0"
        }}>
          As a highlight of the Forum, our <strong>Design Sprint Workshops</strong> will give you the opportunity to collaborate with fellow innovators on real challenges facing African development. These interactive sessions will be led by expert facilitators across diverse disciplines including:
        </p>
        
        {/* Workshop Categories */}
        <ul style={{ 
          padding: "0 0 0 20px",
          margin: "15px 0",
          lineHeight: "1.8",
          fontFamily: "Georgia, serif"
        }}>
          <li style={{ marginBottom: "8px" }}>
            <span style={{ color: raadeNavy, fontWeight: "bold" }}>Sustainable Agriculture & Food Security</span> 
            - From Indigenous Crops to Nutritional Wealth: Market-Creating Innovations for Burkina Faso
          </li>
          <li style={{ marginBottom: "8px" }}>
            <span style={{ color: raadeNavy, fontWeight: "bold" }}>Renewable Energy Solutions</span> 
            - Harnessing the Sun: Market-Creating Innovations for Rural Electrification in Niger
          </li>
          <li style={{ marginBottom: "8px" }}>
            <span style={{ color: raadeNavy, fontWeight: "bold" }}>Financial Technology & Inclusion</span> 
            - Bridging the Finance Gap: Innovative Financial Systems for Senegal's Missing Middle
          </li>
          <li style={{ marginBottom: "8px" }}>
            <span style={{ color: raadeNavy, fontWeight: "bold" }}>Healthcare Innovation</span> 
            - Mobility & Medicine: Creating Sustainable Healthcare Delivery Models in Chad
          </li>
          <li style={{ marginBottom: "8px" }}>
            <span style={{ color: raadeNavy, fontWeight: "bold" }}>Cultural & Historical Context</span> 
            - Exploring Mali's Development Through a Historical Lens
          </li>
        </ul>
        
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5",
          fontFamily: "Georgia, serif",
          margin: "15px 0"
        }}>
          We want to ensure you have the most meaningful experience possible, so we'll be <strong>matching each participant to a workshop</strong> that best aligns with their interests and expertise.
        </p>
      </div>
      
      {/* Call to Action */}
      <div style={{ 
        marginBottom: "30px", 
        backgroundColor: "#f8f8f8",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center"
      }}>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5",
          fontFamily: "Georgia, serif",
          margin: "0 0 15px 0",
          fontWeight: "bold",
          color: raadeNavy
        }}>
          👉 Please take a moment to share your top three workshop preferences:
        </p>
        
        <a 
          href={workshopFormLink}
          style={{
            display: "inline-block",
            backgroundColor: raadeGold,
            color: raadeNavy,
            padding: "12px 25px",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
            margin: "10px 0",
            fontFamily: "Georgia, serif"
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Select Your Workshop Preferences
        </a>
      </div>
      
      {/* What to Expect */}
      <div style={{ 
        marginBottom: "30px", 
        border: `2px solid ${raadeNavy}`,
        borderRadius: "8px",
        padding: "20px"
      }}>
        <h2 style={{ 
          color: raadeNavy, 
          marginTop: "0",
          fontFamily: "Georgia, serif",
          fontSize: "22px",
          borderBottom: `2px solid ${raadeGold}`,
          paddingBottom: "10px"
        }}>
          What to Expect in These Workshops
        </h2>
        
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: "15px",
          marginTop: "15px"
        }}>
          <div style={{ 
            padding: "12px 15px",
            backgroundColor: "#f8f8f8",
            borderLeft: `4px solid ${raadeGold}`,
            fontFamily: "Georgia, serif"
          }}>
            <p style={{ margin: "0", fontWeight: "bold" }}>Collaborative problem-solving with diverse perspectives</p>
          </div>
          
          <div style={{ 
            padding: "12px 15px",
            backgroundColor: "#f8f8f8",
            borderLeft: `4px solid ${raadeGold}`,
            fontFamily: "Georgia, serif"
          }}>
            <p style={{ margin: "0", fontWeight: "bold" }}>Guidance from field experts and facilitators</p>
          </div>
          
          <div style={{ 
            padding: "12px 15px",
            backgroundColor: "#f8f8f8",
            borderLeft: `4px solid ${raadeGold}`,
            fontFamily: "Georgia, serif"
          }}>
            <p style={{ margin: "0", fontWeight: "bold" }}>Opportunities to build lasting professional connections</p>
          </div>
          
          <div style={{ 
            padding: "12px 15px",
            backgroundColor: "#f8f8f8",
            borderLeft: `4px solid ${raadeGold}`,
            fontFamily: "Georgia, serif"
          }}>
            <p style={{ margin: "0", fontWeight: "bold" }}>The chance to develop solutions with real-world potential</p>
          </div>
        </div>
      </div>
      
      {/* Stay Connected */}
      <div style={{ 
        marginBottom: "30px", 
        border: `2px solid ${raadeNavy}`,
        borderRadius: "8px",
        padding: "20px"
      }}>
        <h2 style={{ 
          color: raadeNavy, 
          marginTop: "0",
          fontFamily: "Georgia, serif",
          fontSize: "22px",
          borderBottom: `2px solid ${raadeGold}`,
          paddingBottom: "10px"
        }}>
          Connect With Us
        </h2>
        
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5",
          fontFamily: "Georgia, serif",
          margin: "15px 0"
        }}>
          In the meantime, connect with fellow attendees and join the pre-conference conversation:
        </p>
        
        <ul style={{ 
          padding: "0 0 0 20px",
          margin: "15px 0",
          lineHeight: "1.6",
          fontFamily: "Georgia, serif"
        }}>
          <li>Follow us on Instagram: <a href={instagramLink} style={{ color: raadeNavy, fontWeight: "bold" }}>@rice_aade</a></li>
          <li>Visit our website: <a href={websiteLink} style={{ color: raadeNavy, fontWeight: "bold" }}>{websiteLink.replace("https://", "")}</a></li>
          <li>Connect on LinkedIn: <a href={linkedInLink} style={{ color: raadeNavy, fontWeight: "bold" }}>Rice Association for African Development</a></li>
        </ul>
      </div>
      
      {/* Signature */}
      <div style={{ 
        marginTop: "30px",
        borderTop: "1px solid #eee",
        paddingTop: "20px"
      }}>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5",
          fontFamily: "Georgia, serif",
          margin: "0 0 15px 0"
        }}>
          We look forward to your workshop preferences and can't wait to welcome you to Rice University next month!
        </p>
        
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.5",
          fontFamily: "Georgia, serif",
          margin: "0 0 5px 0"
        }}>
          Warm regards,
        </p>
        
        <p style={{ 
          margin: "15px 0 5px 0",
          fontWeight: "bold",
          color: raadeNavy,
          fontFamily: "Georgia, serif"
        }}>
          The RAADE Team
        </p>
      </div>
    </div>
  );
};

export default RaadeWorkshopEmail;
