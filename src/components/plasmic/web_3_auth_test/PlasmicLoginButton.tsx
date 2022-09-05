// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 54HMz7Hvd2hKuAsezVhBVr
// Component: gSxAtSkc_B2bx
import * as React from "react";

import * as p from "@plasmicapp/react-web";
import * as ph from "@plasmicapp/host";

import {
  hasVariant,
  classNames,
  wrapWithClassName,
  createPlasmicElementProxy,
  makeFragment,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  pick,
  omit,
  useTrigger,
  StrictProps,
  deriveRenderOpts,
  ensureGlobalVariants
} from "@plasmicapp/react-web";
import Button from "../../Button"; // plasmic-import: 2absIEKb81Nff/component

import "@plasmicapp/react-web/lib/plasmic.css";

import projectcss from "./plasmic_web_3_auth_test.module.css"; // plasmic-import: 54HMz7Hvd2hKuAsezVhBVr/projectcss
import sty from "./PlasmicLoginButton.module.css"; // plasmic-import: gSxAtSkc_B2bx/css

import ChecksvgIcon from "./icons/PlasmicIcon__Checksvg"; // plasmic-import: x5R3V1qKIDRpC/icon
import IconIcon from "./icons/PlasmicIcon__Icon"; // plasmic-import: jOZ57IuiaExMg/icon

export type PlasmicLoginButton__VariantMembers = {};

export type PlasmicLoginButton__VariantsArgs = {};
type VariantPropType = keyof PlasmicLoginButton__VariantsArgs;
export const PlasmicLoginButton__VariantProps = new Array<VariantPropType>();

export type PlasmicLoginButton__ArgsType = {};
type ArgPropType = keyof PlasmicLoginButton__ArgsType;
export const PlasmicLoginButton__ArgProps = new Array<ArgPropType>();

export type PlasmicLoginButton__OverridesType = {
  root?: p.Flex<typeof Button>;
  text?: p.Flex<"div">;
};

export interface DefaultLoginButtonProps {
  className?: string;
}

function PlasmicLoginButton__RenderFunc(props: {
  variants: PlasmicLoginButton__VariantsArgs;
  args: PlasmicLoginButton__ArgsType;
  overrides: PlasmicLoginButton__OverridesType;

  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const $ctx = ph.useDataEnv?.() || {};
  const args = React.useMemo(
    () =>
      Object.assign(
        {},

        props.args
      ),
    [props.args]
  );

  const $props = args;

  return (
    <Button
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames("__wab_instance", sty.root)}
    >
      <div
        data-plasmic-name={"text"}
        data-plasmic-override={overrides.text}
        className={classNames(projectcss.all, projectcss.__wab_text, sty.text)}
      >
        {"Connect"}
      </div>
    </Button>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "text"],
  text: ["text"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  typeof PlasmicDescendants[T][number];
type NodeDefaultElementType = {
  root: typeof Button;
  text: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicLoginButton__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicLoginButton__VariantsArgs;
    args?: PlasmicLoginButton__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicLoginButton__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicLoginButton__ArgsType, ReservedPropsType> &
    // Specify overrides for each element directly as props
    Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    // Specify props for the root element
    Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: [...PlasmicDescendants[nodeName]],
          internalArgPropNames: PlasmicLoginButton__ArgProps,
          internalVariantPropNames: PlasmicLoginButton__VariantProps
        }),
      [props, nodeName]
    );

    return PlasmicLoginButton__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicLoginButton";
  } else {
    func.displayName = `PlasmicLoginButton.${nodeName}`;
  }
  return func;
}

export const PlasmicLoginButton = Object.assign(
  // Top-level PlasmicLoginButton renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    text: makeNodeComponent("text"),

    // Metadata about props expected for PlasmicLoginButton
    internalVariantProps: PlasmicLoginButton__VariantProps,
    internalArgProps: PlasmicLoginButton__ArgProps
  }
);

export default PlasmicLoginButton;
/* prettier-ignore-end */