import pandas as pd
from config import supabase

def fetch_participants():
    res = supabase.table("participants").select("*").execute()
    return pd.DataFrame(res.data)

def fetch_baseline_assessments():
    res = supabase.table("baseline_assessments").select("*").execute()
    return pd.DataFrame(res.data)

def fetch_weekly_checkins():
    res = supabase.table("weekly_checkins").select("*").execute()
    return pd.DataFrame(res.data)

def fetch_chapter_confidence():
    res = supabase.table("chapter_confidence_checks").select("*").execute()
    return pd.DataFrame(res.data)

def fetch_attendance():
    res = supabase.table("attendance_logs").select("*").execute()
    return pd.DataFrame(res.data)

def fetch_dashboard_activity():
    res = supabase.table("dashboard_activity_logs").select("*").execute()
    return pd.DataFrame(res.data)

def fetch_risk_scores():
    res = supabase.table("risk_scores").select("*").execute()
    return pd.DataFrame(res.data)

def fetch_all():
    return {
        "participants":           fetch_participants(),
        "baseline_assessments":   fetch_baseline_assessments(),
        "weekly_checkins":        fetch_weekly_checkins(),
        "chapter_confidence":     fetch_chapter_confidence(),
        "attendance":             fetch_attendance(),
        "dashboard_activity":     fetch_dashboard_activity(),
        "risk_scores":            fetch_risk_scores(),
    }

if __name__ == "__main__":
    data = fetch_all()
    for name, df in data.items():
        print(f"{name}: {len(df)} rows")
