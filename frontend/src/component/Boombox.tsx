import React, { useEffect, useState } from "react";

function randomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

function useRandomColor() {
  const [color, setColor] = useState("#265eae");
  useEffect(() => {
    let timer = setInterval(() => {
      setColor(randomColor());
    }, 1500);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return color;
}

export function Boombox() {
  const color = useRandomColor();

  return (
    <div className="p-4 m-4 bg-shadow rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 849.86 587.75"
        style={{
          fill: color,
          transition: "fill ease-in-out 1s",
          stroke: color,
        }}
      >
        <g id="Layer_2" data-name="Layer 2">
          <path
            d="M779.14,353.55a132.32,132.32,0,0,0-93.21-39.72h-1.21a132.66,132.66,0,0,0-1.14,265.31h1.2a132.66,132.66,0,0,0,94.36-225.59ZM572.22,446A112.21,112.21,0,0,1,684.78,334.14h1a112,112,0,0,1,56.94,16.23,13.79,13.79,0,0,1-8.61,15.45l-104.9,39.75a34,34,0,0,0,24,63.7l70.14-26.6a13.75,13.75,0,0,1,9.7,25.72l-104.9,39.77A34,34,0,0,0,609.26,526a29.64,29.64,0,0,0-1.13,2.88q-1.75-1.62-3.43-3.31A112.48,112.48,0,0,1,572.22,446Zm191.47,80.29a112,112,0,0,1-78.91,32.55h-1a111.93,111.93,0,0,1-57-15.92,13.75,13.75,0,0,1,8.57-15.7l104.86-39.83a34,34,0,0,0-24-63.7l-70.13,26.6a13.75,13.75,0,0,1-9.71-25.72L741.26,384.8A34.09,34.09,0,0,0,760.19,367c.38-.85.71-1.71,1-2.58q1.78,1.67,3.5,3.42a112.47,112.47,0,0,1-1,158.49Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M270.69,353.55a132.34,132.34,0,0,0-93.21-39.72h-1.22a132.66,132.66,0,0,0-1.13,265.31h1.2a132.67,132.67,0,0,0,94.36-225.59ZM63.76,446A112.21,112.21,0,0,1,176.33,334.14h1a112,112,0,0,1,56.95,16.23,13.81,13.81,0,0,1-8.62,15.45l-104.9,39.75a34,34,0,0,0,24,63.7l70.13-26.6a13.75,13.75,0,0,1,9.7,25.72l-104.9,39.77A34.07,34.07,0,0,0,100.8,526c-.42.94-.8,1.9-1.13,2.88-1.16-1.08-2.31-2.18-3.43-3.31A112.52,112.52,0,0,1,63.76,446Zm191.47,80.29a112,112,0,0,1-78.9,32.55h-1a111.91,111.91,0,0,1-57-15.92,13.76,13.76,0,0,1,8.56-15.7l104.86-39.83a34,34,0,0,0-24-63.7l-70.14,26.6a13.75,13.75,0,0,1-9.71-25.72L232.8,384.8A34,34,0,0,0,251.73,367q.57-1.27,1-2.58,1.78,1.67,3.51,3.42a112.45,112.45,0,0,1-1,158.49Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M88.58,671c0-9.38,6.78-17,15.13-17s15.13,7.62,15.13,17-6.78,17-15.13,17S88.58,680.39,88.58,671Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M136.42,688c-8.35,0-15.13-7.62-15.13-17V654h30.27v17C151.56,680.39,144.77,688,136.42,688Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M184.27,665.34H174.18V688H164.09V665.34H154V654h30.27Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M209.41,679.51c0,4.7-3.38,8.5-7.57,8.5H186.71V671h15.13C206,671,209.41,674.83,209.41,679.51ZM201.84,654H217v17H201.84c-4.18,0-7.56-3.83-7.56-8.5S197.66,654,201.84,654Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M219.42,671c0-9.38,6.79-17,15.13-17v34C226.21,688,219.42,680.39,219.42,671Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M247.09,654v11.33h10.09V654h10.09v34H257.18V676.68H247.09V688H237V654Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M269.71,671c0-9.38,6.79-17,15.14-17S300,661.63,300,671s-6.79,17-15.13,17S269.71,680.39,269.71,671Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M302.42,671c0-9.38,6.79-17,15.14-17s15.13,7.62,15.13,17-6.79,17-15.13,17S302.42,680.39,302.42,671Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            className="cls-1"
            d="M365.4,671v17H335.13V654h15.14v17Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M391.43,671c0-9.38,6.78-17,15.13-17v34C398.21,688,391.43,680.39,391.43,671Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M424.14,688c-8.35,0-15.13-7.62-15.13-17V654h30.26v17C439.27,680.39,432.49,688,424.14,688Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M464.42,662.51c0,4.67-3.38,8.5-7.57,8.5v17H441.72V654h15.13C461,654,464.42,657.8,464.42,662.51Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M466.86,671c0-9.38,6.79-17,15.14-17v34C473.65,688,466.86,680.39,466.86,671Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            className="cls-1"
            d="M518.24,688h-33.8l16.9-34Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M520.68,654H551l-30.27,17Zm0,34V671L551,688Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M553.39,688V654h30.27l-20.18,11.33h20.18v11.34H563.48L583.66,688Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M609.69,654h33.8l-16.9,34Zm67.62,0-16.9,34-16.92-34Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M679.74,688V654H710l-20.18,11.33H710v11.34H689.83L710,688Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M712.46,688V654h30.26l-20.18,11.33h20.18v11.34H722.54L742.72,688Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M745.17,654h30.26l-30.26,17Zm0,34V671l30.26,17Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M389.31,560.44v18.88h-18.5V560.44l9.74-8.94h-9.74v-10h9.74a9.45,9.45,0,0,1,0,18.89Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M396.56,560.44a18.5,18.5,0,1,1,18.5,18.88A18.71,18.71,0,0,1,396.56,560.44Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M458.81,560.44v18.88h-18.5V560.44l9.74-8.94h-9.74v-10h9.74a9.45,9.45,0,0,1,0,18.89Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            className="cls-1"
            d="M484.55,541.55v37.77H466.06V541.55Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M377.45,263.68c-5.22-.84-10.85.2-16.05.92-2.74.37-2.92,5,0,4.92,5.28-.21,10.83.37,16.05-.55C379.79,268.56,379.81,264.07,377.45,263.68Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M376.72,253.57c-3-.14-5.94-.33-8.91-.49-2.68-.14-5.19-.77-7.64.48-1.59.81-1.29,3,0,3.84,2.22,1.51,5.05,1.1,7.64,1.11,3,0,5.94-.16,8.91-.39A2.28,2.28,0,0,0,376.72,253.57Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M377.08,243.35c-4.9-.44-10.19.63-15.11.9a2.37,2.37,0,0,0,0,4.73c5.08.21,10.84.76,15.8-.52C380.77,247.68,379.88,243.6,377.08,243.35Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M406.85,264.52c-2.4-1.43-5.14-.81-7.84-.63-3,.19-6.07.61-9.09,1a2.16,2.16,0,0,0,0,4.31c3,.16,6.06.4,9.09.41,2.66,0,5.57.51,7.84-1A2.35,2.35,0,0,0,406.85,264.52Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M404.89,253.14c-3.31-1-7.19-.71-10.76-.31a25.9,25.9,0,0,0-3.52-.05c-3.16.21-4.33,5.26-.8,5.9,4.5.81,9.26.3,13.8.21a2.14,2.14,0,0,0,2.27-2.37A2.06,2.06,0,0,0,404.89,253.14Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M405.46,242.05c-1.7-1-3.45-.84-5.29-.6a41.24,41.24,0,0,0-8.88-.14,2.42,2.42,0,0,0-1.31.53c-1.46.22-2.73,1.69-1.65,3.22,1.78,2.55,4.83,2.16,7.67,2.18,3.31,0,7.28.65,9.92-1.62A2.29,2.29,0,0,0,405.46,242.05Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M405.29,230c-2.33-1.46-5.08-.94-7.67-.75a78.09,78.09,0,0,0-8.21.92c-2.45.45-1.48,4.08.54,4.38a72.92,72.92,0,0,0,8.22.58c2.43.08,5,.45,7.12-1A2.56,2.56,0,0,0,405.29,230Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M430.49,265.43c-4.09-.42-8.19-.61-12.29-.69a2.49,2.49,0,0,0-2.36,1.27,2.29,2.29,0,0,0,1,4,2.84,2.84,0,0,0,1.39.4c1.66,0,3.32.12,5,.2,2.43.19,4.86.35,7.31.46C434.17,271.24,434,265.79,430.49,265.43Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M430.72,254.26l-3.3.11c-3.19,0-6.31-.32-9.54-.55s-4.05,5.16-.78,5.8a44.12,44.12,0,0,0,13.62.11C434.11,259.32,434.33,254.16,430.72,254.26Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M458.16,253.68c-4.64-.28-10.42-1.26-14.92.08a2.71,2.71,0,0,0,.32,5.21,131.85,131.85,0,0,0,14.6.53C461.92,259.37,461.89,253.91,458.16,253.68Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M457.9,264.84c-2.6.08-5.19.27-7.78.5-2.46,0-4.89-.53-7.32-.11-2,.35-2.38,3.15-1,4.38a2.25,2.25,0,0,0,1.79.92h0c4.52,1.7,10.6,1,15.11.37C462.18,270.41,461.33,264.72,457.9,264.84Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M458.15,239.92a39.16,39.16,0,0,0-6.21-.25c-2.45-.1-4.91-.17-7.34-.09a2.74,2.74,0,0,0-2.79,3c-.26,1.36.53,3,2.18,2.78l.2,0a2.5,2.5,0,0,0,.41.07c4.49.35,9.06.2,13.55.27C461.94,245.71,461.71,240.36,458.15,239.92Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M481,265.05c-2.62.1-5.24.19-7.86.19-1.76,0-3.15-.22-4.37.59h-.16c-1.75,0-2.35,2.85-1,3.67,1.39,2.18,3.22,1.85,5.49,1.81,2.63-.05,5.24-.24,7.86-.54C484.25,270.63,484.28,264.92,481,265.05Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M503.67,265.73l-5.29.23c-2.26,0-4.51-.12-6.81-.11-3.06,0-3.76,4.59-.72,5.39,4,1.06,8.69.83,12.82.39C507.35,271.23,507.53,265.56,503.67,265.73Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M502.88,254.55l-1.67.09a59.22,59.22,0,0,0-6-.11c-2.34.09-4.45,0-5.83,2.13a2.12,2.12,0,0,0,.33,2.56c1.94,1.5,3.47,1,5.76.6l1.09-.16c2.09.18,4.19.31,6.28.42C506.44,260.26,506.45,254.36,502.88,254.55Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M503.16,242.82c-3.9-.15-8.58-.62-12.34.52-3.24,1-2.35,5.29.76,5.62a36.19,36.19,0,0,0,5.78-.3c1.93-.11,3.86-.16,5.8-.17C506.82,248.57,506.8,243,503.16,242.82Z"
            transform="translate(-7.66 -100.27)"
          />
        </g>
        <g id="Layer_3" data-name="Layer 3">
          <path
            d="M645.62,269.84a2.46,2.46,0,0,0-1-2.06c-2.07-1.61-4.09-2.45-6.74-2a9.43,9.43,0,0,0-5.09,2.84,10.6,10.6,0,0,0-2.37,10.86,9.35,9.35,0,0,0,10.54,5.78,9.5,9.5,0,0,0,6.82-7.57A9,9,0,0,0,645.62,269.84Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M218.66,265.92c-4.57,3.14-7.19,9.74-3.12,14.34a9,9,0,0,0,3.66,2.44c3.43,2.79,8.82,2.78,11.6-1.39,2.35-3.53,1.58-8.68-.51-12.15C227.83,265.1,222.88,263,218.66,265.92Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M768.2,246.27a19,19,0,0,0-4.08,24.43,16.4,16.4,0,0,0,21.64,5.51,14.19,14.19,0,0,0,4.6-2.56c7.46-6.22,7.15-16.88,1.26-24S775.68,240.27,768.2,246.27Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M775.35,219.44c-16.41,1.87-35.74,16.34-36.39,33.77a35.35,35.35,0,0,0-.48,7.26c.37,9,4,17.91,9.28,25.08,10.71,14.51,30.73,21.94,47.85,14.65,18.3-7.79,26.15-32.13,21.55-50.48S794.33,217.28,775.35,219.44ZM794.11,290c-11.86,7.34-27.59,2.58-36.5-7.18a40.56,40.56,0,0,1-9.69-19.72,30.33,30.33,0,0,1,.8-15.06c4.3-9.16,14.6-16.52,23.5-18.65,14.61-3.48,27.91,5.28,33.88,18.61S806.81,282.11,794.11,290Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M91.84,220c-12.87-4.67-27.19,1.19-35.75,11.43-10.56,9.69-15,24.59-12,39.43C48,289.94,64.78,305.74,85,303.6c19.39-2.05,36-19,37-38.63C123,245.56,110,226.56,91.84,220Zm-3.23,73.38c-15.35,4.47-30-5.31-34.82-19.94a36.31,36.31,0,0,1,8.44-37.27c6.59-5.73,15.84-9.38,23.08-8.35,14.63,2.08,25.44,17.75,27,31.53C114.1,274.68,103.2,289.12,88.61,293.37Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M524.12,230.85c0-3.7,0-8.68-2.83-11.51a8.17,8.17,0,0,0-5.07-2.07c-4.63-1.67-10.69-1.6-14.41-1.66-9.87-.18-19.72.65-29.59.57-18-.16-36-.11-54-.16-17.64-.05-35.33-1-53-.49-5.78.15-12.73-.91-18.49.9a2.45,2.45,0,0,0-2.09.75l-.12.13-.45.21c-3.69,2-4.39,5-4.56,8.4-1.44,4.73-1.38,9.87-1.11,15.29.29,5.71.16,11.4.31,17.12a84.35,84.35,0,0,0,1.11,13c-1.36,4.06.33,7.59,4,9.79a5.38,5.38,0,0,0,4.17,1.69c8,2.13,17.92.58,26,.61,17,.06,34.07-.62,51.1-.4,17.3.22,34.58,1.16,51.88,1.23,8.61,0,17.3-.41,25.9,0,4.75.24,10.32,1,14.58-1.37,7.59-2.69,6.65-24.17,6.47-29.17C523.75,246.06,524.2,238.5,524.12,230.85Zm-27.61,45.58c-9.08,0-18.16,0-27.24-.18-18.92-.33-37.83-1.31-56.75-1.07-9,.11-17.95.49-26.93.35-7.73-.11-15.54-.67-23.26-.3a111.4,111.4,0,0,1-11.7.15h0a3.61,3.61,0,0,0-.87-.16c1.08,0,.21,0-.37-1.37A23.53,23.53,0,0,1,348,268a101.87,101.87,0,0,1-.76-13.75c0-4.13.05-8.2-.37-12.33-.59-5.78-1.67-12.45.35-18.06,2.51-1.85,7.68-1.26,10.45-1.24,8.88,0,17.75-.19,26.64.08,19.78.62,39.6.74,59.39.91,15,.14,30.07.71,45.08,0,5.41-.24,10.84-.44,16.26-.14,2.53.14,9.07,0,10.72,2.54a4.08,4.08,0,0,0,.25.33c.18,4.19-.42,8.54-.63,12.73-.25,4.74,0,9.37.09,14.1.2,6.59,2,19-3.69,23.56a1.15,1.15,0,0,0-.14.17C506.81,277.62,500.76,276.45,496.51,276.43Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M545.87,304.81c14.75,13.73,40.21,10.12,53.12-4.51,7.66-8.68,8-19.91,5.61-30.63.33-12.55-5.46-25-17.44-30.41s-29.09-4.77-38.54,5.36a31,31,0,0,0-7.48,14.69,40.35,40.35,0,0,0-5.52,17.35C534.76,287,538.21,297.69,545.87,304.81Zm2.28-39c.66-7.17,2.76-14.58,9-18.8,11.1-7.51,29.72-4.07,36.48,7.64,6.88,11.92,3.31,28.93-8.84,35.85-6.11,3.48-14.17,5.14-20.95,2.84a33.45,33.45,0,0,1-10-5.73C549.79,280.74,547.41,274,548.15,265.83Zm-4.34,17a29.72,29.72,0,0,0,10.63,14.28c6.48,4.69,14.29,5.84,22,4.6a33.65,33.65,0,0,0,20.91-11.82,28.59,28.59,0,0,1-6.68,8.69,33.8,33.8,0,0,1-29.18,7.36c-13.85-3.34-19.19-14.65-19.28-27A35.08,35.08,0,0,0,543.81,282.79Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M515.84,317.1c-7.59-.78-15.24-.14-22.83.14-7.37.26-14.69-.45-22.05-.29-15,.32-30,1.75-45,1.76-14.9,0-29.71.84-44.58,1.54-7.76.37-15.46,0-23.22-.15-6-.1-13.24-2.35-19.06-.37-4.08,1.39-2.38,7.83,1.79,6.51,3.3-1,6.49.22,9.81.62s6.95.4,10.42.49c7.39.21,14.79.59,22.19.51,14.88-.16,29.7-1.29,44.6-1.28,14.73,0,29.34-1.61,44.05-1.86,7-.12,14,.55,21.09.17,7.63-.41,15.18-1.19,22.83-1.17C520.19,323.74,520,317.53,515.84,317.1Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M528.61,537c-.55-13.87-11.16-18.44-23.53-19.36a439.52,439.52,0,0,0-54.32-.61c-21.26,1-42.44.17-63.66,2.1-10.6,1-21.1-.88-31.69-.12-8.47.62-17.48,3-21.44,11.3-1.85,3.89-2,8.25-1.91,12.48.05,5.17-.55,10.27-.77,15.43s0,10.52-.25,15.77a88.45,88.45,0,0,0-.15,10.15,4.18,4.18,0,0,0-.42,3.31C335,604.7,362,598.34,374.66,598.21c10.57-.11,21.09.24,31.67-.14,11.1-.4,22.16-.54,33.27-.14,10.75.38,21.49,1,32.25,1,7.86,0,15.69-.49,23.55-.26,10.48.3,24.52,1.25,31.39-8.47,4.28-6.05,3.58-14,3.34-21C529.77,558.49,529,547.77,528.61,537ZM521,579.89c-1.22,10.54-13.73,9.8-21.79,9.6-15-.36-29.91.14-44.89-.4-10.42-.37-20.85-.87-31.28-.73s-20.9.85-31.36,1c-9.77.16-19.4-.13-29.16.49-5.26.33-19.31,2.49-22.71-3.23-.4-3.66.31-7.33.67-11,.43-4.31.38-8.6.46-12.92.13-7.79.47-15.63.82-23.41.74-16.7,28.69-10,39.2-10.36,8.49-.33,16.89-1.73,25.39-2,9.34-.31,18.69-.2,28-.3,18.19-.19,36.38-2.24,54.57-1,5.74.38,11.52.64,17.25,1.15,4,.37,9.59,1,12,4.7,1.46,2.23,1.32,4.92,1.36,7.47.07,4.75.3,9.49.58,14.23C520.62,561.88,522,571.19,521,579.89Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M403.18,407a6.87,6.87,0,0,0-2.64-3.52,3.88,3.88,0,0,0-4.66.6h0a6.76,6.76,0,0,0-4.21,5.89,5.12,5.12,0,0,0,4,5.27,4.52,4.52,0,0,0,3.65.53,5.56,5.56,0,0,0,3.41-3,7.73,7.73,0,0,0,.45-5.68Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M460.69,404.2a7.29,7.29,0,0,0-4,4.32,5.63,5.63,0,0,0,.2,3.7,4.17,4.17,0,0,0,.58,1.95,4.48,4.48,0,0,0,3.9,2.24c2.94-.22,5.89-1.46,6.85-4.51a7,7,0,0,0-2.2-7A4.52,4.52,0,0,0,460.69,404.2Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M499,378.16a3.37,3.37,0,0,0-2-2.05,3,3,0,0,0-3.61-1.35c-3.48.94-7.16.2-10.68-.22a60.53,60.53,0,0,0-10.43-.26c-9.27.46-18.37,1.19-27.67.8-8.86-.38-17.7-1.45-26.57-1.61-9.45-.17-18.92.76-28.34,1.36-4.39.28-8.78.53-13.19.64-3.18.09-6.81-.25-9.85.92-4.68,1.8-5.75,6.69-6.38,11.17-1.22,8.69.13,17.95.48,26.69.15,4,.26,7.93.65,11.87s1.28,8.09.62,12.14c-.76,1.75-.08,4.08,2.14,4.28,10.09,3.37,21.35,2.18,31.81,2.49,12.7.38,25.39,0,38.08.65,11.95.58,23.63-1.53,35.54-1.91,5.31-.16,10.75-.12,16.06,0,3.63.11,7.77,1.36,11.27-.11a4.37,4.37,0,0,0,2.72-3.95,2.83,2.83,0,0,0,1-1.68c2.14-10.58,1.07-22.26.92-33C501.42,396.06,502.25,386.75,499,378.16ZM434,438c-11.72-.49-23.42-.17-35.14-.41-1.59,0-3.17,0-4.75-.06,2.53-3.59,5.14-6.69,10.11-6.78,1.54,0,3.06-.09,4.57-.17,4,.23,8,.19,12,.16,5.54-.05,11-.58,16.57-.71a107.11,107.11,0,0,1,14,.56c3.14.33,6.36.66,9.33-.19,1.91,1.35,3.14,3.41,4.54,5.26l.12.16C454.9,436.56,444.5,438.43,434,438Zm60-16.06c-.19,4.66-.74,9.45-.24,14.11-2.79.63-6.37-.44-9.11-.46-3.94,0-7.92-.12-11.88-.07-1.13-1.6-2.75-3-3.88-4.45a20.18,20.18,0,0,0-4.5-4.25,2,2,0,0,0-2-1.56c-13,0-25.72-.26-38.69.44-1.75.1-3.51.16-5.26.23s-3.73.09-5.68.17c-4,.17-8.13-.71-12,.07a10.28,10.28,0,0,0-1.63.47c-.41,0-2.14.83-2,1-3.52,2.21-5.62,6.23-7.78,9.88a192.94,192.94,0,0,1-21-.78c.85-5.61,0-11.45-.17-17.11-.19-8.5-1-17-1.06-25.53,0-2.84-.44-7.74,1.34-10.17,1.34-1.83,4-1.37,6.18-1.48,8.78-.44,17.56-1,26.34-1.57,17.23-1,34.1.57,51.3.87,8.5.15,17-1.14,25.47-.87,5,.17,10.36,2,15.36,1,1.66,8,.83,16.49,1,24.63C494.11,411.65,494.18,416.78,494,421.94Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M857.49,352c-.41-22-1.26-44.06-1.59-66.11q0-6.37-.08-12.75c0-1.83,0-3.67,0-5.51q0-18,.47-35.93c.25-9.25.79-18.39-2.19-26.84a39.67,39.67,0,0,0-.2-4.23c-.67-6.52-3.15-12.92-8.27-17.24a26.78,26.78,0,0,0-8.56-4.85,24.37,24.37,0,0,0-2.93-.9c-7.77-1.8-16.25-1.43-24.18-1.84a129.74,129.74,0,0,0-15.66.32q-18.93-.83-37.87-1.37c.48-8.49-.07-17.25,0-25.62,0-5.42,0-10.78-.13-16.13,2.5-2.9,1.85-7.4,1.49-11.22-.42-4.45-1.53-9-4.49-12.46s-6.7-4.6-11.11-5c-1.26-.1-2.53-.17-3.79-.22-3.2-.32-6.42-.35-9-.61q-14.61-1.47-29.3-2.21c-19.91-1-39.85-1.21-59.78-1-29.1.35-128.58,1.32-147.76,1.09l-57.8-.67c-26.45-.31-52.81-.45-79.19,0-.21,0-.41-.08-.63-.09-17.76-1.11-35.95.16-53.75.25s-35.83.12-53.74.11c-24.11,0-48.2-.18-72.28.26-1.93-.14-3.87-.17-5.82-.24q-8-.3-15.9-.32c-9.42,0-19-.14-28.42.89-7,.77-14.21,3.12-18,9.54A20.75,20.75,0,0,0,104.3,120c-2.71,6.88-1.59,15-1.06,22.18.83,11.08.61,22.31.86,33.44l-5.69,0c-14.81.09-29.65,0-44.46.36-4.38.12-8.75.38-13.07.91l-3.84,0a4.57,4.57,0,0,0-2.72.86,31.56,31.56,0,0,0-9.64,2.74,33.18,33.18,0,0,0-7.88,3.42c-5,3.36-7.11,14.37-7.51,17.48a117.87,117.87,0,0,0-.3,23.3c-.86,27.41-.3,55-.35,82.36-.08,46.05.26,92.1.56,138.15q0,26.68-.14,53.37c-.06,17.28-.25,34.57-.26,51.85q0,12.59,0,25.18a154.18,154.18,0,0,0-1.1,17.43c-.17,7.19.4,14.54,3.17,21.25a30.21,30.21,0,0,0,6.61,9.92,16.37,16.37,0,0,0,7.19,6.62c5.63,2.73,12,2.68,18.1,2.06.14,3.18.85,6.32,3.09,8.68,2.61,2.76,6.24,1.9,9.64,2,4.18.12,9.17,1.44,12.79-1.34,2.92-2.24,3.44-6.16,3.47-9.83q15.84.14,31.68.11c3.45.07,6.91.16,10.36.22,58.48,1.15,117,1.16,175.46.7q44.6-.35,89.17-1l45.83,0c10.11.65,20.23,1.1,30.35,1.27,13.22.22,26.4.13,39.62-.34,8-.29,16.68-.11,25.07-.83l50.07,0c16.09,2.3,105.74,2.75,116.36.1l29.71,0c8.27.69,19.2.85,27.51,1.08,19,.51,49.31,1,50.57.9,0,1.36,0,4.6.07,6a3.71,3.71,0,0,0,2.68,3.52c6.83,1.55,19.2,3.74,25.19-.82,3.08-2.34,2.62-7.07,2.71-10.85a56.53,56.53,0,0,0,6.27-1.35,33.8,33.8,0,0,0,17.36-10.73c6.93-8.43,7.42-19.74,5.79-30.46.18-3.94.31-7.87.43-11.8,1.54-11.78,1-23.92,1.06-35.75q.09-17.5-.11-35,.31-34.89.59-69.77.19-25.34.33-50.66A335.3,335.3,0,0,0,857.49,352ZM742,153.87q-.07-5.91-.35-11.81c-.08-1.71,0-3.43-.25-5.08,2.54-.1,5.07-.21,7.61-.35-.25,3.85-.48,7.71-.62,11.57-.32,8.55-1.4,17.58-1.27,26.3-1.64-.05-3.29-.08-4.93-.12C742.36,167.56,742.11,160.68,742,153.87ZM116.15,114.81c4.42-4.81,13.43-4,19.34-4.25q11.91-.47,23.85-.34c7.15.08,66.56,0,88,0q26.87,0,53.74-.11c17.78-.08,107.93-.42,133.57-.07l57.8.78c16.46.22,33.16,1.18,49.66.78,30.4.57,60.83-.92,91.23-1.42,19-.32,37.92-.31,56.87.43q13.69.52,27.37,1.59,6.84.55,13.66,1.25c3.44.36,10.43-.21,13,2.47a4.18,4.18,0,0,0,2.17,1.24c.76,3.68-.05,8.87-.1,11.89-39.93-2-80.18-.74-120.15-.7l-125.69.14-251.37.29c-45.33.05-90.78-.8-136.1.2C113.05,124.08,112.84,118.4,116.15,114.81Zm11.42,23.83c35.19.36,70.44-.28,105.62-.33l125.69-.17,251.37-.35q34.92,0,69.83-.15c18.12,0,36.25.11,54.36-.42-.09,1.23-.08,2.51-.12,3.86q-.18,6.39-.23,12.79c0,6.76-.33,13.55-.29,20.32q-16-.36-32-.58c-33.45-.41-67-1.33-100.35,1.2-15.92-.16-31.83.42-47.75.76-3.57.07-7.15.13-10.72.18l-23-.15q-21.9-.69-43.86-.73c-13.24,0-26.48.13-39.72.34q-123.55-.45-247.1,0-30.83.12-61.64.3C128.14,163.24,127.82,150.87,127.57,138.64Zm-7.67-.12c-.52,12.28-1.12,24.71-.83,37l-5.93,0c.5-6.14-.27-12.76-.5-18.68-.23-6.16-.64-12.32-1-18.47C114.36,138.45,117.13,138.48,119.9,138.52ZM21.83,200.39c3.85-7.22,10.61-10.65,18-12.74a136.28,136.28,0,0,1,16.65-1.13c2,0,3.94-.06,5.92-.08l25.91.12q20.58,1,41.18,1.49c37.27.9,74.56.75,111.83.1,22.3-.39,44.6-1,66.9-1.59l38.35,0,224.27-.08q43.18.28,86.35.67,45.4.4,90.81.92c26.56.31,53.16.83,79.71,0a31.28,31.28,0,0,1,5.43,2.44A19,19,0,0,1,841.82,202c-19.57-.61-39.22-.11-58.79,0q-31.49.13-63,.33-62,.36-124,.26-125.48-.08-250.93-.48c-47-.17-94-1.16-141-.55a3.4,3.4,0,0,0-.46.06c-13.34-.75-26.81-.27-40.13-.13-16.88.16-33.76.32-50.64.38q-24.81.1-49.64.15c-14,0-28.14-.34-42.18,0C21.34,201.39,21.57,200.89,21.83,200.39ZM64.47,635c-.85,3.44-5.09,2.07-8,2-1.43,0-4.78.82-6,.13-.61-.35-1.34-2.78-1.79-5l.3-.07q7.89.15,15.78.24A11.73,11.73,0,0,1,64.47,635Zm751.2,2.94c-2.82,1.66-9.62,1-14,.63a1.17,1.17,0,0,1-1.08-1.05c-.14-1.26-.28-2.91-.33-3.24,4.95-.48,10.83.63,15.71-.33C816,635.09,816.47,637.47,815.67,637.94Zm29.51-227.83c-.39,3.59-.71,7.18-.89,10.8-1,19.1-.07,38.31.57,57.47q-.11,16.68-.25,33.36c-.11,12.24-.27,24.47-.35,36.7a2.75,2.75,0,0,0-.67,2.67c.24,1,.45,2,.64,3.06,0,11.61,0,23.22.32,34.83A93.76,93.76,0,0,1,842,603.47c-2,7.51-6.28,13.23-13.34,16.65-.4.2-.81.38-1.23.55-4.46,1.12-10,.3-14.37,2-10.54-.7-21.14-.49-31.71-.5H742.41l-38.21,0q-7.63-.17-15.27-.29a280.16,280.16,0,0,0-45.16-.6c-49.7-.43-99.39-.18-149.09.31q-21.75.21-43.52.49-96.54,0-193.1,0c-4.78-.41-9.58-.74-14.43-1q-19.09-.93-38.18-1.57c-13.51-.46-26.89.72-40.23,2.38-34.83-.22-69.69-.55-104.5-.08l-.75,0c-7.34-.24-14.74-.25-22.06-.9a33.81,33.81,0,0,1-11.2-2.62c-3.52-4.14-5-9.85-5.68-15.28-.87-7.33-1.4-14.69-1.9-22.07l0-.07a3.93,3.93,0,0,0-.19-2.46c-.12-1.87-.25-3.74-.38-5.61q0-7.15,0-14.3.06-17.71,0-35.41,0-10.17.05-20.34,0-42.87.08-85.73,0-35.31.07-70.63.11-34.31.2-68.63.07-16.29.19-32.56c.06-8,.15-16,.22-24,0-4.34-.35-9,.2-13.36,14.54.34,29.16-.08,43.68-.09q25.32,0,50.64-.09c16.87,0,33.75,0,50.63-.12,4.54,0,9.09,0,13.65,0-1.52,29.86-.82,60-.68,89.89l-.32.07a64.07,64.07,0,0,0-6.88.45c-8.72,1.06-27.66,3.6-36.11,5.94-15.62,4.33-18.78,5.38-33.43,12.5-27.52,13.37-50.55,39.16-62.9,67C14.28,436.67,21.15,505,60.81,549.06c22.23,24.72,53,38.16,84.62,46.3,18.2,4.68,36,4.89,54.54,2,9.47-1.47,18.82-3.55,28.18-5.58,8-1.75,15.84-3.44,23.42-6.75,62.59-27.37,84.9-107.18,73.22-169.57-5.77-30.8-20.81-61.05-44.42-82-22-19.56-51.08-33-80.44-36.09a109.16,109.16,0,0,0-16.15-.51c.27-29.76,1.09-59.72-.3-89.44,6.47-.07,12.93-.25,19.37-.71a2.88,2.88,0,0,0,1.33.36c42,1.08,84,.66,126,.87q62,.3,124,.48c74.33.2,148.66,0,223,.08-.5,15.26.34,30.58.65,45.84.3,14.56-.26,29.46.89,44-1,0-1.91.08-2.87.17a41.89,41.89,0,0,0-5.13-.41,89.81,89.81,0,0,0-13.16,1.55,188.75,188.75,0,0,0-25.66,5.52c-8,2.46-16.56,5.21-23.84,9.41-6.63,3.82-12.12,9.5-18.38,13.88-26.69,18.63-42.3,48.39-50.54,79.32s-5.71,63.81,2.63,94.42c4.1,15.05,10.46,29.47,20.54,41.49,9.81,11.68,22.29,21.75,34.78,30.42,13.6,9.44,28.38,14.26,44.22,18.56,17.31,4.69,35.28,8.47,53.31,7.46,30.48-1.71,60.24-15.3,84.65-33,12.53-9.1,22.41-19.24,30.32-32.62s14.89-27.1,19.12-41.94c4.42-15.53,7.57-32.18,6.69-48.38a210.57,210.57,0,0,0-8-48.14c-8.73-29.28-26.41-56.74-52.82-72.83-24.6-15-53.45-20.37-81.63-24-2.58-.33-5.11-.6-7.63-.77.79-14.6-.3-29.56-.68-44.13-.4-15.27-.46-30.63-2-45.83,7.49,0,15,0,22.48,0q35,.06,70,.06c22.62,0,45.36.44,68-.5.8,7.93,0,16.07,0,24-.11,8.9,0,17.81.1,26.71.28,17.8,1,35.6,1.83,53.39.08,1.6.15,3.2.23,4.81q.07,16.34.12,32.67Q845.28,379.9,845.18,410.11ZM198.28,305.94a33.12,33.12,0,0,1,5.62.54A153.2,153.2,0,0,1,257,326.94c25.32,16,43.58,40.44,53.57,68.54,20.57,57.91,7.53,133.79-44.09,171.69a93.55,93.55,0,0,1-20.17,11.52c-7.13,2.87-14.67,4.21-22.15,5.83-17.35,3.77-34.89,7.58-52.74,7-16.92-.59-34-6-49.78-11.86-14.86-5.54-29-13-41.34-23.07-43.74-35.81-57.49-99.34-41.91-152.34C46.22,377.55,62,351.72,85,335.64c12-8.4,24.39-15.59,38.4-19.86,7.62-2.31,9.79-3.61,17.49-5.65,8-2.13,22.91-3.5,31.21-4.26C179.21,305.23,192.84,305.84,198.28,305.94Zm516,5.68c12.89,2.53,25.73,5.77,37.93,10.72,27,10.93,46.69,31,59.4,57,13.16,26.92,19.12,59.92,14,89.54-2.61,15.23-6.43,30.11-13.41,44-6.44,12.8-13.44,25.59-23.57,35.89-9.75,9.91-22.2,18-34.32,24.71a160.87,160.87,0,0,1-38.58,15.21A117.46,117.46,0,0,1,666,590.37c-8.28-1.45-16.44-3.46-24.53-5.67-7.78-2.12-15.74-4.08-23.15-7.29-13.43-5.82-25.11-15.13-36.08-24.67C571,543,561.66,532.16,555.57,518.53c-6.16-13.8-9.3-28.77-11.47-43.66s-3.74-29.75-2-44.71c3.63-30.4,16.23-61.69,37.48-84,5.37-5.63,11.78-9.62,18-14.18,6-4.4,11.13-9.6,18.07-12.54,15-6.35,30.8-9.87,46.74-12.79,1.45-.27,2.89-.48,4.32-.66a4,4,0,0,0,3.32,1C684.33,305,700.27,308.87,714.26,311.62Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M520.2,437.49c-.17-12.21.12-24.45.24-36.67.11-11.07,2.08-22.68.37-33.69-1.12-7.16-5.74-11.12-12.87-11.56-4.29-.26-8.55.28-12.84-.2-6.46-.71-12.79-2.3-19.3-2.59-6.71-.31-13.4.41-20.09.89-7.08.51-14.17.46-21.26.6-13.55.28-27.1.82-40.65.74-14.36-.08-28.68-.86-43-.76a3.86,3.86,0,0,0-3.83,2.7c-9.82,5.56-8.16,21.51-7.26,31.16,2,21.81.08,44.11-.05,66-.08,11.79-.32,23.65.41,35.43.37,6,1.87,11.05,8.37,12.46,4.79,1,10.05.45,14.92.66,6.49.27,13,.77,19.43,1.24,12.36.89,24.66,1.34,37.05,1.16,24.38-.35,48.63-2,73-.59a80.05,80.05,0,0,0,15.71-.18c3.48-.48,7.91-.89,10.41-3.7,2.18-2.46,2.25-6.19,2.59-9.29a124,124,0,0,0,.39-18.39C521.44,461.09,520.36,449.33,520.2,437.49Zm-142,57.86-.37,0c-5.17-.35-10.34-.68-15.53-.87-2.58-.09-5.17-.13-7.75-.16-1.39,0-4.33.39-5.56-.61-1-.77-.85-3.89-.93-5.3-.29-5.18-.43-10.37-.51-15.55,0-.77,0-1.55,0-2.32,10.24-.44,20.45-.22,30.68.14C378.19,478.88,378.09,487.15,378.25,495.35Zm6.94.41c1.27-8.09.21-16.64-.16-24.85l1.33,0c8.18.32,16.34.44,24.52.49.15,4.94,0,9.86,0,14.79,0,3.4-.06,7,.79,10.26C402.87,496.46,394,496.23,385.19,495.76Zm32.94.74c.56-3.64.07-7.63,0-11.24-.11-4.6-.4-9.2-.86-13.77h11.4c4.76,0,9.52-.06,14.28-.11-.17,4.6-.17,9.2-.12,13.81,0,3.55-.26,7.24.18,10.79Q430.53,496.43,418.13,496.5Zm58.13-1.4h-.12c-8.78-.1-17.56.25-26.34.6.31-3.47-.2-7.05-.4-10.52-.28-4.63-.51-9.25-.55-13.88q13.74-.21,27.48-.56C478.39,478.85,475.51,487,476.26,495.1Zm36.43-4.71a29.54,29.54,0,0,0-.36,3.23,7.07,7.07,0,0,1-.26.94l-.5.22a21,21,0,0,1-3.62.78c-8,1.34-16.42.4-24.65-.15,1-8,1.63-17-.37-24.83q15-.37,30.07-.76c.06,2,.12,3.92.15,5.88A135.86,135.86,0,0,1,512.69,490.39Zm.16-109.72c-.43,21.51-.71,43-.64,64.51,0,5.64.26,11.28.49,16.91-28.33-.64-56.67,1.44-85,1.43-14.12,0-28.18-.23-42.29-.65-12.62-.37-25.31-.5-37.86,1.07,0-22.21.87-44.43.37-66.62-.15-6.46-1.28-12.86-1.47-19.33-.13-4.67-.67-12.15,3.38-15.4a4.59,4.59,0,0,0,.94.1c22.11.18,44.14,1.22,66.26.69,10.66-.25,21.33-.28,32-.62,10.92-.34,21.79-2.22,32.7-.68a161.61,161.61,0,0,0,24.23,2.07c2.13,0,4.48-.2,5.78,1.73C514.05,369.33,512.93,376.7,512.85,380.67Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M533.32,308.9c-5-4.46-12.71-5.17-19.14-5.53-7.84-.44-15.7.26-23.54.32-19.59.16-39.19,1.64-58.77.72-9.67-.45-19.33-1.14-29-.68-9.51.45-19,1.34-28.52,1.8-9,.43-17.81-.34-26.79-.27-7.29.06-15.48,1.2-20.82,6.69a13.34,13.34,0,0,0-2,16.1,17.91,17.91,0,0,0,1.17,1.76,2.2,2.2,0,0,0,.17,1.07c2.36,5.66,6.92,7.65,12.83,8.17,7.75.68,15.69.12,23.48.49,20.05,1,40,.59,60.07.38,19.72-.21,39.51-1.4,59.21-1.11,9.81.14,19.63.74,29.44.3,6.69-.3,13.34-.54,18.81-4.79C537.59,328.39,541.49,316.13,533.32,308.9Zm-10.49,20.37c-5.79,2.77-14.26,1.84-20.51,1.8-8.51-.07-17-.6-25.53-.53-15.78.12-31.58,1-47.37,1.2-18.37.26-36.85,1.13-55.21.55-8.87-.28-17.76-.9-26.64-.73-1.53,0-3.17.12-4.83.14A2.77,2.77,0,0,0,341,331c-4.76-.26-10.55-4.09-10.76-9.35-.28-7.08,9-9.06,14.36-9.27,5.87-.23,11.71.64,17.58.89,7.85.35,15.75-.26,23.58-.78a398.86,398.86,0,0,1,46.13-.4c16.31.77,32.6-.21,48.9-.56,6.85-.14,13.68-.17,20.53-.4s14.14-.59,20.92,1.09c3.8.95,7.86,2.66,7.71,7.21C529.8,323.55,526.41,327.55,522.83,329.27Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M317.1,254.55a36.76,36.76,0,0,0-3.21-5.56c-9.75-13.92-28-16.87-42.45-8.27a30.74,30.74,0,0,0-15.08,25.12c-3.57,15,1.35,33.18,14.49,41.16,18.25,11.09,42.36,3.58,50.37-16.17C326.25,278.42,325.41,265,317.1,254.55Zm-53,4.55a25.14,25.14,0,0,1,6.15-9.6c9.76-9.45,26.59-10.45,35.94,0,9,10.13,11.34,27,.55,36.74-8.74,7.88-23.46,9.32-33.25,2.53-5.43-3.77-8.72-9.78-9.95-16.19C262.63,267.88,263.43,263.55,264.11,259.1Zm49.66,33.73c-5.67,9.67-16.67,14.2-27.59,12.55-9.93-1.5-17.64-6.93-21.39-16a25.91,25.91,0,0,0,2.28,2.53c11.28,10.74,29.66,10.35,41.86,1.34A27.83,27.83,0,0,0,317.5,283,34.81,34.81,0,0,1,313.77,292.83Z"
            transform="translate(-7.66 -100.27)"
          />
          <path
            d="M88.72,245.74a16.4,16.4,0,0,0-21.11,12.07c-1.79,8,1.74,16.4,9.14,19.53A12.44,12.44,0,0,0,84,280.55c7.63.6,14.68-6.36,16.58-13.32A18,18,0,0,0,88.72,245.74Z"
            transform="translate(-7.66 -100.27)"
          />
        </g>
      </svg>
    </div>
  );
}
