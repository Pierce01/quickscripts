import requests
import pandas as pd


def main():
    user_input = input("Enter path to input file: ")
    if user_input == "":
        user_input = "data.csv"
    df = parseInput(user_input)
    df.to_csv("output.csv", index=False)


def parseInput(user_input):
    df = pd.read_csv(user_input)
    df["Redirect Match"] = "pending"
    df["Status Code"] = "pending"
    df["Start"] = df["Start"].str.rstrip('*/')
    df["End"] = df["End"].str.rstrip('*/')
    for i in range(len(df)):
        url = df.loc[i, "Start"]
        end = df.loc[i, "End"]
        if not url.startswith("http"):
            url = "http://stage-www.seattleu.edu" + url
        if not end.startswith("http"):
            end = "http://stage-www.seattleu.edu" + end
        print(f"Checking {url} to {end}")
        try:
            response = requests.get(url)
            df.loc[i, "Status Code"] = response.status_code
            if response.status_code == 200:
                if response.url.rstrip('*/') == end:
                    df.loc[i, "Redirect Match"] = "yes"
                else:
                    df.loc[i, "Redirect Match"] = "no"
            else:
                df.loc[i, "Redirect Match"] = "no"
        except Exception as e:
            print(f"Error: {e}")
            df.loc[i, "Status Code"] = "error"
            df.loc[i, "Redirect Match"] = "error"
    return df


if __name__ == "__main__":
    main()
