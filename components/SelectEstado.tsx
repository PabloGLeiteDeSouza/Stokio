import {
  Select,
  SelectTrigger,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  ChevronDownIcon,
  SelectDragIndicator,
  SelectInput,
  SelectItem,
  SelectDragIndicatorWrapper,
  ScrollView,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelperText,
  FormControlError,
  AlertCircleIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlErrorIcon
} from "@gluestack-ui/themed";
import Estados from "$databases/Estados.json";


const SelectEstado: React.FC = () => {
  const size = "lg" as "sm" | "md" | "lg" | "xl" | undefined,
    variant = "outline" as "outline" | "rounded" | "underlined";

  return (
    <FormControl
      isInvalid={false}
      size={"md"}
      isDisabled={false}
      isRequired={true}
    >
      <FormControlLabel>
        <FormControlLabelText>Estados</FormControlLabelText>
      </FormControlLabel>
      <Select isInvalid={false} isDisabled={false}>
        <SelectTrigger size={size} variant={variant}>
          <SelectInput placeholder="Select option" />
          <SelectIcon
            mr={variant === "underlined" ? 0 : "$3"}
            ml={variant === "underlined" ? "$3" : 0}
            as={ChevronDownIcon}
          />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <ScrollView w="$full">
              {Estados.map((estado) => (
                <SelectItem
                  key={estado.id}
                  value={estado.sigla}
                  label={estado.nome}
                />
              ))}
            </ScrollView>
          </SelectContent>
        </SelectPortal>
      </Select>
      <FormControlHelper>
        <FormControlHelperText>
          Must be atleast 6 characters.
        </FormControlHelperText>
      </FormControlHelper>

      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>
          Atleast 6 characters are required.
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default SelectEstado;
