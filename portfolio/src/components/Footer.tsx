const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        © {new Date().getFullYear()}{" "}
        <a href="#">Harsh Aerndolkar</a>. Built with 💖 using React &
        TypeScript.
      </div>
    </footer>
  );
};

export default Footer;