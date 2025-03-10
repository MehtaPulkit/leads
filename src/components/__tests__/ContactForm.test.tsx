import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ContactForm from "../ContactForm";

// Mock the form submission function if needed

describe("ContactForm Component", () => {
  beforeEach(() => {
    render(<ContactForm formType="general" />);
  });

  it("renders the contact form correctly", () => {
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Additional Information/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Request Appraisal/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    fireEvent.click(screen.getByRole("button", { name: /Request Appraisal/i }));

    await waitFor(() => {
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Property address is required/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Please enter a valid Australian mobile number starting with 04/i
        )
      ).toBeInTheDocument();

      expect(screen.getByText(/Invalid property type/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid reason/i)).toBeInTheDocument();
    });
  });

  it("submits the form with valid input", async () => {
    fireEvent.input(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.input(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Request Appraisal/i }));
  });
});
