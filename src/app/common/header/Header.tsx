import {useState} from 'react'
import Link from 'next/link'

export default function Header(): JSX.Element {
  const [searchValue, setSearchValue] = useState('')
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(!active)
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
 
  return (
    <header className="header">
      <div className="header-static">
          <div className="header-phone-number cursor-pointer" >
            <div className="phone-icon-wrapper">
              <div className="header-phone-icon" />
            </div>
            <a className="header-phone" href="tel:+373 69 000 000">
              069 00 00 00
            </a>
          </div>
          <div className="header-links">
            <Link href="/">
              Magazine regionale
            </Link>
            <Link href="/service">
              Service centru
            </Link>
            <Link href="/news">
              Știri
            </Link>
          </div>
      </div>
      <div className="header-fixed">
        <Link href="/">
          <div className="logo-wrapper">
            <div className="logo" />
          </div>
        </Link>
        <div className="header-menu">
          <div className="burger-icon"/>
          <span>Catalogul produselor</span>
        </div>
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <div style={{ margin: "0 auto" }}>
              <div className="search-icon" />
              <input
                id="Search"
                placeholder="Search..."
                value={searchValue}
                onChange={handleChange}
                className="search-bar"
              />
            </div>
          </form>
        </div>
        <div className="header-cart-section">
          <div className="icons-wrapper">
            <Link href="/cart">
              <div className="header-cart-icon">
                <div className="cart-notification">1</div>
              </div>
            </Link>
            <Link href="/favorites">
              <div className="header-favorites-icon" />
            </Link>
          </div>
          <div className="lang-wrapper">
            <div className={active ? "lang active" : 'lang'} onClick={handleClick}>
              Ro
            </div>
            <div className={active ? 'lang' : "lang active"}  onClick={handleClick}>
              Ru
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}