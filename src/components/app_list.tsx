import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Dapp } from "../features/dapp/models/dapp";
import { spaceMono } from "../theme";
import { Button, Card, RImage as Image, Text } from "./index";
import { Column, Row } from "./layout/flex";
import { convertUrl } from "../utils";

//tags on top of app card
export function Tag(props: { children: ReactNode }) {
  const _classNames = classNames({
    "text-[10px] leading-[10px] uppercase": true,
    "px-[6px] py-[4px]": true,
    "bg-border-color": true,
    "rounded-[10px]": true,
    [spaceMono.className]: true,
  });
  return <span className={_classNames}>{props.children}</span>;
}
// List of apps
export function AppList(props) {
  const router = useRouter();

  return (
    <div>
      {props.data.length ? (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3">
          {props.data.map((app: Dapp) => (
            <Link href={`/dapp?id=${app.dappId}`}>
              {" "}
              <Card key={app.dappId}>
                {/* <Link href={}> */}
                <Row className="justify-between">
                  <Image
                    src={convertUrl(app.images.logo)}
                    width={64}
                    height={64}
                    className="rounded-lg"
                    alt=""
                  />
                  <Row className="items-start gap-[6px]">
                    {app.tags?.slice(0, 3).map((e) => (
                      <Tag>{e}</Tag>
                    ))}
                  </Row>
                </Row>
                <p className="text-[24px] leading-[32px] font-[500] my-4 inline-flex gap-1.5 items-center">
                  {app.name}
                  {app?.verification && app?.verification?.icon && (
                    <Image
                      height={30}
                      width={30}
                      src={app?.verification?.icon}
					  alt="icon"
                    />
                  )}
                </p>
                <Text
                  classNames="text-[16px] leading-[21px] text-[#87868C] font-[400] line-clamp-3"
                  maxLines={3}
                >
                  {app.description.substring(0, 200)}
                </Text>
                {/* </Link> */}
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Column className="flex items-center w-full gap-y-4">
          <p className="text-xl text-center">No app found with the search!</p>
          <p className="text-xl text-center">
            But you can claim it on the Meroku protocol rightaway.
          </p>
          <Button
            onClick={() => {
              window.gtag("event", "claim-app", {
                location: "no-app-found",
              });
            }}
          >
            <a target={"_blank"} href={"https://app.meroku.org"}>
              Claim App Now
            </a>
          </Button>
        </Column>
      )}
    </div>
  );
}
