import matugen from "./matugen"
import hyprland from "./hyprland"
import gtk from "./gtk"
import lowBattery from "./battery"
import swww from "./swww"
import notifications from "./notifications"

try {
    gtk()
    matugen()
    lowBattery()
    notifications()
    hyprland()
    swww()
} catch (error) {
    logError(error)
}
