import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-active={pathname === props.to}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground data-[active=true]:text-foreground"
      {...props}
    ></Link>
  )
}

export default NavLink
