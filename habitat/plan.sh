pkg_name=site
pkg_origin=chefconf
pkg_version="0.1.0"
pkg_scaffolding="core/scaffolding-node"

# do_before() {
#   attach
#   rm package-lock.json
# }

pkg_exports=(
  [port]=port
)
pkg_exposes=(port)

do_build() {
  npm install
  ln -sf $(hab pkg path core/coreutils)/bin/* /usr/bin
  npm run prestart
  rm package-lock.json
}

do_install() {
  cp -rf ./* $PREFIX/.
}