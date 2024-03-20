import options from "options"
import { sh, dependencies } from "./utils"
import variables from "lib/colors/pywal.json"

export default function init() {
    matugen()
}

function animate(...setters: Array<() => void>) {
    const delay = options.transition.value / 2
    setters.forEach((fn, i) => Utils.timeout(delay * i, fn))
}

export async function matugen(
    type: "image" | "color" = "image",
    arg = options.wallpaper.value,
) {
    if (!options.autotheme.value || !dependencies("matugen"))
        return

    const colors = await sh(`matugen -t scheme-rainbow --dry-run -j hex ${type} ${arg}`)
    const c = JSON.parse(colors).colors as { light: Colors, dark: Colors }
    const { dark, light } = options.theme

    animate(
        () => {
            dark.widget.value = c.dark.on_surface
            light.widget.value = c.light.on_surface
        },
        () => {
            dark.border.value = c.dark.outline
            light.border.value = c.light.outline
        },
        () => {
            dark.bg.value = "#000000"
            light.bg.value = c.light.surface
        },
        () => {
            dark.fg.value = c.dark.on_surface
            light.fg.value = "#000000"
        },
        () => {
            dark.primary.bg.value = variables.variables.accent_bg_color
            light.primary.bg.value = c.light.primary
            options.bar.battery.charging.value = options.theme.scheme.value === "dark"
                ? c.dark.primary : c.light.primary
        },
        () => {
            dark.primary.fg.value = variables.variables.accent_fg_color
            light.primary.fg.value = c.light.on_primary
        },
        () => {
            dark.error.bg.value = variables.variables.error_bg_color
            light.error.bg.value = c.light.error
        },
        () => {
            dark.error.fg.value = variables.variables.error_fg_color
            light.error.fg.value = c.light.on_error
        },
    )
}

type Colors = {
    background: string
    error: string
    error_container: string
    inverse_on_surface: string
    inverse_primary: string
    inverse_surface: string
    on_background: string
    on_error: string
    on_error_container: string
    on_primary: string
    on_primary_container: string
    on_primary_fixed: string
    on_primary_fixed_variant: string
    on_secondary: string
    on_secondary_container: string
    on_secondary_fixed: string
    on_secondary_fixed_variant: string
    on_surface: string
    on_surface_variant: string
    on_tertiary: string
    on_tertiary_container: string
    on_tertiary_fixed: string
    on_tertiary_fixed_variant: string
    outline: string
    outline_variant: string
    primary: string
    primary_container: string
    primary_fixed: string
    primary_fixed_dim: string
    scrim: string
    secondary: string
    secondary_container: string
    secondary_fixed: string
    secondary_fixed_dim: string
    shadow: string
    surface: string
    surface_bright: string
    surface_container: string
    surface_container_high: string
    surface_container_highest: string
    surface_container_low: string
    surface_container_lowest: string
    surface_dim: string
    surface_variant: string
    tertiary: string
    tertiary_container: string
    tertiary_fixed: string
    tertiary_fixed_dim: string
}
