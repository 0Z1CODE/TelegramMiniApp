import processor_i from "./../assets/img/icons/pc_bw/processor.png";
import motherboard_i from "./../assets/img/icons/pc_bw/motherboard.png";
import cooler_i from "./../assets/img/icons/pc_bw/cooler.png";
import dram_i from "./../assets/img/icons/pc_bw/memory.png";
import gpu_i from "./../assets/img/icons/pc_bw/gpu-mining.png";
import ssd_i from "./../assets/img/icons/pc_bw/ssd-drive.png";
import hdd_i from "./../assets/img/icons/pc_bw/hard-disk-drive.png";
import pb_i from "./../assets/img/icons/pc_bw/power-supply.png";
import case_i from "./../assets/img/icons/pc_bw/computer-case.png";
import option_c_i from "./../assets/img/icons/pc_bw/cooling-fan.png";
import os_i from "./../assets/img/icons/pc_bw/operating-system.png";

export const ready_pc = "ready_pc";

//icons
export const processor_icon = processor_i;
export const motherboard_icon = motherboard_i;
export const cooler_icon = cooler_i;
export const dram_icon = dram_i;
export const gpu_icon = gpu_i;
export const ssd_icon = ssd_i;
export const hdd_icon = hdd_i;
export const pb_icon = pb_i;
export const case_icon = case_i;
export const option_c_icon = option_c_i;
export const os_icon = os_i;

//equil

export const equilPC = [
  { input: "processor", output: "Процесор", icon: processor_icon },
  { input: "cooler", output: "Охолодження процесора", icon: cooler_icon },
  { input: "motherboard", output: "Материнська плата", icon: motherboard_icon },
  { input: "dram", output: "Оперативна пам'ять", icon: dram_icon },
  { input: "gpu", output: "Відеокарта", icon: gpu_icon },
  { input: "ssd", output: "Накопичувач SSD", icon: ssd_icon },
  { input: "hdd", output: "Накопичувач HDD", icon: hdd_icon },
  { input: "pb", output: "Блок живлення", icon: pb_icon },
  { input: "case", output: "Корпус", icon: case_icon },
  {
    input: "option_cooler",
    output: "Додаткове охолодження",
    icon: option_c_icon,
  },
  { input: "os", output: "Операційна система", icon: os_icon },
];
