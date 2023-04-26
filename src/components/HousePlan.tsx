import { useState, ElementType, useEffect } from "react";
import styled from "@emotion/styled";
interface LightButtonProps {
  lightOn: boolean;
  as?: ElementType;
  onClick?: () => void;
}

const HousePlanWrapper = styled.div`
  position: relative;
  width: 600px;
  height: 400px;
  background-color: #f0f0f0;
`;

interface RoomProps {
  lightOn: boolean;
}

const Room = styled.div<RoomProps>`
  position: absolute;
  background-color: ${({ lightOn }) => (lightOn ? "aqua" : "white")};
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LightButton = styled.button<LightButtonProps>`
  background-color: ${({ lightOn }) => (lightOn ? "aqua" : "white")};
  border: none;
  cursor: pointer;
`;

const HousePlan = () => {
  const [lights, setLights] = useState({
    bedroom1: false,
    bedroom2: false,
    comfortRoom: false,
    livingRoom: false,
    balcony: false,
  });

  type RoomKey =
    | "bedroom1"
    | "bedroom2"
    | "comfortRoom"
    | "livingRoom"
    | "balcony";

  const roomToIdMap: { [key in RoomKey]: number } = {
    bedroom1: 17,
    bedroom2: 27,
    comfortRoom: 22,
    livingRoom: 23,
    balcony: 24,
  };

  const toggleLight = async (room: RoomKey) => {
    const currentState = lights[room];

    const payload = {
      id: roomToIdMap[room],
      state: currentState ? "OFF" : "ON",
    };

    console.log("payload", payload);

    try {
      const response = await fetch(
        "https://608a-2406-2d40-311a-6910-00-a96.ngrok-free.app/api/v1/gpio",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update light state");
      }

      // Update the state of the lights object
      setLights((prevLights) => ({
        ...prevLights,
        [room]: !currentState,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HousePlanWrapper>
      <Room
        lightOn={lights.bedroom1}
        style={{ top: "10px", left: "10px", width: "120px", height: "100px" }}
        onClick={() => toggleLight("bedroom1")}
      >
        Bedroom 1
      </Room>
      <Room
        lightOn={lights.bedroom2}
        style={{ top: "10px", right: "10px", width: "120px", height: "100px" }}
        onClick={() => toggleLight("bedroom2")}
      >
        Bedroom 2
      </Room>
      <Room
        lightOn={lights.comfortRoom}
        style={{ bottom: "10px", left: "10px", width: "100px", height: "80px" }}
        onClick={() => toggleLight("comfortRoom")}
      >
        Comfort Room
      </Room>
      <Room
        lightOn={lights.livingRoom}
        style={{
          bottom: "10px",
          right: "10px",
          width: "200px",
          height: "120px",
        }}
        onClick={() => toggleLight("livingRoom")}
      >
        Living Room
      </Room>
      <Room
        style={{
          bottom: "10px",
          right: "220px",
          width: "100px",
          height: "80px",
        }}
        lightOn={lights.balcony}
        onClick={() => toggleLight("balcony")}
      >
        Balcony
      </Room>
    </HousePlanWrapper>
  );
};

export default HousePlan;
